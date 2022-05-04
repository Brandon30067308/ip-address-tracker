import { NextApiRequest, NextApiResponse } from "next/types";

const getInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const ip = req.query?.ip?.toString();

  const fetchUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${
    process.env.API_KEY
  }${ip !== "none" ? `&ipAddress=${ip}` : "&ipAddress="}`;
  fetch(fetchUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return res
        .status(response.status)
        .end(
          res.statusCode === 422 ? "Invalid IP Address" : "An error occurred"
        );
    })
    .then((info) => {
      return res.json(info);
    })
    .catch(() => {
      return res.status(502).end("Network Error");
    });
};

export default getInfo;
