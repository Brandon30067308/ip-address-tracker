import { FC, Fragment, useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { TileLayer, MapContainer, Popup, Marker } from "react-leaflet";

interface MainProps {
  ip: string;
  info: {
    ip: string;
    location: string;
    timezone: string;
    isp: string;
    lng: number;
    lat: number;
  } | null;
  fetchInfo: (ipAddress?: string) => void;
  error: string | null;
  loading: boolean;
}

const Main: FC<MainProps> = ({ ip, info, error, loading, fetchInfo }) => {
  const [infoBarHeight, setInfoBarHeight] = useState<number>();
  const infoBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setInfoBarHeight(infoBarRef.current?.clientHeight || 175);
    const resizeObserver = new ResizeObserver(() => {
      setInfoBarHeight(infoBarRef.current?.clientHeight || 175);
    });
    infoBarRef.current && resizeObserver.observe(infoBarRef.current);
  }, []);

  const handleRetry = () => {
    fetchInfo(ip);
  };

  return (
    <div className="w-full flex flex-1 flex-col h-full justify-center items-center">
      <main
        className="w-full max-w-[2160px] h-full flex flex-1 flex-col items-center
        justify-start -mt-[100px]"
      >
        <div
          ref={infoBarRef}
          className={`w-[calc(100%-24px)] md:w-[90vw] max-w-[1096px] min-h-[175px] h-fit flex
          md:flex-row flex-col items-center ${
            info && !error && !loading ? "justify-between" : "justify-center"
          } bg-white rounded-2xl py-6 px-12 shadow-[0px_3.5px_20px_0px_rgb(0_0_0_/_.1)] z-[1500]`}
        >
          {!loading && !error && info ? (
            <Fragment>
              <div className="info md:mb-0 mb-6">
                <h3>IP ADDRESS</h3>
                <p
                  style={{
                    overflowWrap: "anywhere",
                  }}
                >
                  {info.ip}
                </p>
              </div>
              <div
                className="hidden md:block mx-3.5 border-r-2 h-[100px] border-r-gray
                  border-opacity-30"
              />
              <div className="info md:mb-0 mb-6">
                <h3>LOCATION</h3>
                <p>{info.location}</p>
              </div>
              <div
                className="hidden md:block mx-3.5 border-r-2 h-[100px] border-r-gray
                  border-opacity-30"
              />
              <div className="info md:mb-0 mb-6">
                <h3>TIMEZONE</h3>
                <p>{info.timezone}</p>
              </div>
              <div
                className="hidden md:block mx-3.5 border-r-2 h-[100px] border-r-gray
                  border-opacity-30"
              />
              <div className="info">
                <h3>ISP</h3>
                <p>{info.isp}</p>
              </div>
            </Fragment>
          ) : error ? (
            <p className="flex items-center text-error tracking-[0.05em]">
              <span className="mr-2.5 text-[14.5px] sm:text-[18px]">
                {error}
              </span>
              {!error.toLowerCase().includes("invalid") && (
                <button
                  onClick={handleRetry}
                  className={`text-gray ${
                    loading ? "pointer-events-none" : "pointer-events-auto"
                  }`}
                >
                  <FontAwesomeIcon className="w-5 h-5" icon={faRotateLeft} />
                </button>
              )}
            </p>
          ) : (
            <Spinner />
          )}
        </div>
        {!loading && !error && info && (
          <div
            className="w-full flex h-screen md:h-fit md:flex-1"
            style={{
              marginTop: `-${(infoBarHeight || 100) - 100}px`,
            }}
          >
            <MapContainer
              center={[info.lat, info.lng]}
              bounds={[[info.lat, info.lng]]}
              zoom={13}
              zoomControl={false}
              scrollWheelZoom={false}
              className="flex-1 w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[info.lat, info.lng]}>
                <Popup>Your location</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </main>
    </div>
  );
};

export default Main;
