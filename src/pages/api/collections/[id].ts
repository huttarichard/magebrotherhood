import { InfuraProvider } from "@ethersproject/providers";
import { Playables__factory as Playables } from "artifacts/types/factories/Playables__factory";
import { create } from "ipfs-http-client";
import all from "it-all";
import { NextApiRequest, NextApiResponse } from "next";
import { concat } from "uint8arrays";

const NETWORK = process.env.NETWORK;
const INFURA_KEY = process.env.INFURA_KEY;
const IPFS_PUBLIC_KEY = process.env.INFURA_IPFS_PUBLIC_KEY;
const IPFS_SECRET_KEY = process.env.INFURA_IPFS_SECRET_KEY;
const INFURA_IPFS_NODE = process.env.INFURA_IPFS_NODE;
const PLAYABLES_ADDRESS = process.env.PLAYABLES_ADDRESS as string;

function authorization() {
  const buff = Buffer.from(IPFS_PUBLIC_KEY + ":" + IPFS_SECRET_KEY);
  return "Basic " + buff.toString("base64");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ethProvider = new InfuraProvider(NETWORK, INFURA_KEY);
  const playables = Playables.connect(PLAYABLES_ADDRESS, ethProvider);

  const token = await playables.tokens(req.query.id as string);

  const ipfs = await create({
    url: INFURA_IPFS_NODE,
    headers: {
      Authorization: authorization(),
    },
  });

  const data = await all(ipfs.cat(token.uri.replace("ipfs://", "")));
  const buffer = Buffer.from(concat(data));
  const json = JSON.parse(buffer.toString());

  res.json(json);
}
