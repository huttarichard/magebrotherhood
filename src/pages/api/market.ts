import { NextApiRequest, NextApiResponse } from "next";

const COINBASE_URL = "https://api.coinbase.com/v2/exchange-rates";

export async function quoteCoinabse(from: string, to: string) {
  const q = new URLSearchParams({ currency: from.toUpperCase() }).toString();
  const resp = await fetch(COINBASE_URL + "?" + q).then((e) => e.json());
  return parseFloat(resp.data.rates[to]);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, ...params } = req.query;

  try {
    switch (query) {
      case "quote": {
        const { from, to } = params;
        const price = await quoteCoinabse(from as string, to as string);

        res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=59");
        return res.json({
          success: true,
          data: { quote: price },
        });
      }
    }
  } catch (e) {
    res.json({ error: e.message, success: false });
  }
}
