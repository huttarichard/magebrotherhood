import { fetchMarketPricesWithCoinbase } from "lib/server/market";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { from, to } = req.query;
  const price = await fetchMarketPricesWithCoinbase(from as string, to as string);

  res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=59");
  return res.json({
    quote: price,
  });
}
