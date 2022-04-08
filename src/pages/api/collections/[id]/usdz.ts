import { InfuraProvider } from "@ethersproject/providers";
import all from "it-all";
import { contracts } from "lib/contracts";
import { create, getToken } from "lib/ipfs";
import { NextApiRequest, NextApiResponse } from "next";
import { concat } from "uint8arrays";

const NETWORK = parseInt(process.env.NETWORK as string);
const INFURA_KEY = process.env.INFURA_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ethProvider = new InfuraProvider(NETWORK, INFURA_KEY);
  const playables = await contracts.playables.connect(ethProvider);
  const ipfs = await create();

  const json = await getToken({
    id: req.query.id as string,
    ipfs: ipfs,
    playables: playables,
    replaceURISWithGateway: false,
  });

  if (!json.usdz) {
    return res.status(404).json({
      error: "No USDZ file found",
    });
  }

  const path = json.usdz.replace("ipfs://", "");
  const usdz = await all(ipfs.cat(path));
  const usdzBuffer = Buffer.from(concat(usdz));

  res.setHeader("Content-Type", "model/vnd.usdz+zip");
  res.setHeader("Content-Length", usdzBuffer.byteLength);
  res.send(usdzBuffer);
}
