import { NextApiRequest, NextApiResponse } from "next";
import { encode } from "querystring";

const BASE_URL = `https://pro-api.coinmarketcap.com/v2`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const headers: HeadersInit = new Headers();
  headers.set("x-cmc_pro_api_key", process.env.CMC_API_KEY as string);

  const { path, ...params } = req.query;
  const rest = encode(params);
  const querypath = rest.length > 0 ? "?" + rest : rest;

  try {
    const resp = await fetch(`${BASE_URL}/${path}${querypath}`, {
      method: "GET",
      headers: headers,
    });
    const json = await resp.json();

    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=59");
    res.json({ success: true, ...json });
  } catch (e) {
    res.json({ error: e.message, success: false });
  }
}
