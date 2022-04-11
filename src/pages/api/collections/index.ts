import { getTokensSimple } from "lib/ipfs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tokens = await getTokensSimple({
    address: req.query.address as string,
    replaceURISWithGateway: true,
  });
  res.json(tokens);
}
