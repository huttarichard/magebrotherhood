import { getTokenSimple } from "lib/ipfs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getTokenSimple(req.query.id as string);
  res.json(token);
}
