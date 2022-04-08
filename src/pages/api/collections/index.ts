import { getTokensSimple } from "lib/ipfs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tokens = await getTokensSimple();
  res.json(tokens);
}
