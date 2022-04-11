import { getTokenSimple } from "lib/ipfs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getTokenSimple({
    id: req.query.id as string,
    address: req.query.address as string,
    replaceURISWithGateway: true,
  });
  res.json(token);
}
