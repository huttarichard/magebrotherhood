import { InfuraProvider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { Playables__factory } from "artifacts/types/factories/Playables__factory";
import { create } from "ipfs-http-client";
import all from "it-all";
import { NextApiRequest, NextApiResponse } from "next";
import { concat } from "uint8arrays";

const NETWORK = parseInt(process.env.NETWORK as string);
const INFURA_KEY = process.env.INFURA_KEY;
const IPFS_PUBLIC_KEY = process.env.INFURA_IPFS_PUBLIC_KEY;
const IPFS_SECRET_KEY = process.env.INFURA_IPFS_SECRET_KEY;
const IPFS_GATEWAY = process.env.INFURA_IPFS_GATEWAY;
const INFURA_IPFS_NODE = process.env.INFURA_IPFS_NODE;
const PLAYABLES_ADDRESS = process.env.PLAYABLES_ADDRESS as string;

function authorization() {
  const buff = Buffer.from(IPFS_PUBLIC_KEY + ":" + IPFS_SECRET_KEY);
  return "Basic " + buff.toString("base64");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ethProvider = new InfuraProvider(NETWORK, INFURA_KEY);
  const playables = Playables__factory.connect(PLAYABLES_ADDRESS, ethProvider);

  const tokens = [];
  for (let i = 0; i < 3; i++) {
    const t = await playables.tokens(i.toString());
    if (t[0] !== "") {
      tokens.push({
        ...t,
        id: i.toString(),
      });
    }
  }

  const ipfs = await create({
    url: INFURA_IPFS_NODE,
    headers: {
      Authorization: authorization(),
    },
  });

  const items = [];
  for (const token of tokens) {
    const data = await all(ipfs.cat(token.uri.replace("ipfs://", "")));
    const buffer = Buffer.from(concat(data));
    console.log(buffer.toString());
    const item = JSON.parse(buffer.toString());

    for (const prop in item) {
      if (typeof item[prop] !== "string") {
        continue;
      }
      if (!item[prop].startsWith("ipfs://")) {
        continue;
      }
      item[prop] = item[prop].replace("ipfs://", IPFS_GATEWAY + "/ipfs/");
    }
    items.push({
      id: token.id,
      supply: token.supply.toString(),
      minted: token.minted.toString(),
      weight: token.weight.toString(),
      price: formatUnits(token.price, "ether"),
      ...item,
    });
  }

  console.log(items);

  res.json(items);
}
