import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
const Main = dynamic(() => import("../components/Main"), { ssr: false });
import Header from "../components/Header";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [info, setInfo] = useState<null | any>(null);
  const [ip, setIP] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, [ip]);

  const fetchInfo = (ipAddress?: string) => {
    const fetchIP = ipAddress || ip;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 14500);

    error && setError(null);
    setLoading(true);

    fetch(fetchIP ? `/api/getinfo/${fetchIP.trim()}` : "/api/getinfo/none", {
      signal: controller.signal,
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          clearTimeout(timeoutId);
          return res.json();
        }
        throw new Error(
          res.status === 422 ? "Invalid IP Adrress..." : "An error occured..."
        );
      })
      .then((info: any) => {
        const {
          ip,
          isp,
          location: { region, timezone, lat, lng },
        } = info;
        setInfo({ ip, isp, location: region, timezone, lat, lng });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.name === "AbortError" ? "Network error!" : err.message);
      });
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-start
      font-rubik font-normal text-dark"
    >
      <Head>
        <title>IP Address Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
          integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
          crossOrigin=""
        />
      </Head>
      <Header
        ip={ip}
        fetchedIP={info?.ip || ""}
        setIP={setIP}
        loading={loading}
        fetchInfo={fetchInfo}
      />
      <Main
        ip={ip}
        info={info}
        error={error}
        loading={loading}
        fetchInfo={fetchInfo}
      />
    </div>
  );
};

export default Home;
