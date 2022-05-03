import { Dispatch, FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  fetchedIP: string;
  ip: string;
  loading: boolean;
  setIP: Dispatch<string>;
  fetchInfo: (ipAddress?: string) => void;
}

const Header: FC<HeaderProps> = ({
  ip,
  fetchedIP,
  loading,
  fetchInfo,
  setIP,
}) => {
  const [ipValue, setIPValue] = useState("");

  useEffect(() => {
    setIPValue(fetchedIP);
  }, [fetchedIP]);

  return (
    <header
      className="w-full h-max bg-pattern bg-cover bg-no-repeat flex flex-col items-center
      justify-center bg-primary pt-5 md:pt-12 pb-[120px] md:pb-[135px] md:px-6 px-3"
    >
      <h1 className="font-semibold text-[1.7rem] text-center sm:text-4xl text-white mb-6">
        IP Address Tracker
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          ip.trim() === ipValue.trim() ? fetchInfo(ipValue) : setIP(ipValue);
        }}
        className="w-full h-[63px] max-w-[550px] flex items-center justify-center"
      >
        <input
          value={ipValue}
          placeholder="Search for any IP address or domain..."
          onChange={(e) => setIPValue(e.target.value)}
          className="flex-[.875] h-full bg-white text-[16px] sm:text-[18px] px-3.5 py-4
            rounded-l-2xl rounded-r-none outline-none"
        />
        <button
          className={`min-w-[50px] flex-[.125] h-full flex items-center justify-center
          bg-black text-[18px] text-white rounded-r-2xl rounded-l-none ${
            loading ? "bg-opacity-60 pointer-events-none" : "bg-opacity-1"
          } outline-none`}
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            className="sm:w-5 w-4 sm:h-5 h-4"
          />
        </button>
      </form>
    </header>
  );
};

export default Header;
