import { BigNumber } from "@ethersproject/bignumber";
import { InfuraProvider } from "@ethersproject/providers";
import { create as createClient, IPFSHTTPClient } from "ipfs-http-client";
import all from "it-all";
import { concat } from "uint8arrays";

import { formatBNToEtherFloatFixed } from "./bn";
import { contracts, Playables, Staking } from "./contracts";
import env from "./env";

if (typeof window !== "undefined") {
  throw new Error("do not use ipfs in browser");
}

const IPFS_PUBLIC_KEY = process.env.INFURA_IPFS_PUBLIC_KEY;
const IPFS_SECRET_KEY = process.env.INFURA_IPFS_SECRET_KEY;
const IPFS_GATEWAY = process.env.INFURA_IPFS_GATEWAY;
const INFURA_IPFS_NODE = process.env.INFURA_IPFS_NODE;
const INFURA_KEY = env.INFURA_KEY;
const NETWORK = env.NETWORK;

export function authorization() {
  const buff = Buffer.from(IPFS_PUBLIC_KEY + ":" + IPFS_SECRET_KEY);
  return "Basic " + buff.toString("base64");
}

export async function create() {
  return createClient({
    url: INFURA_IPFS_NODE,
    headers: {
      Authorization: authorization(),
    },
  });
}

export function replaceIPFSUris(obj: any) {
  for (const prop in obj) {
    if (!obj.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof obj[prop] === "object") {
      obj[prop] = replaceIPFSUris(obj[prop]);
    }
    if (typeof obj[prop] !== "string") {
      continue;
    }
    if (!obj[prop].startsWith("ipfs://")) {
      continue;
    }
    obj[prop] = obj[prop].replace("ipfs://", IPFS_GATEWAY + "/ipfs/");
  }
  return obj;
}

export class NonExistingToken extends Error {}

export interface GetTokenParams {
  id: string;
  ipfs: IPFSHTTPClient;
  playables: Playables;
  staking?: Staking;
  address?: string;
  replaceURISWithGateway: boolean;
}

export async function getToken(tokenParams: GetTokenParams) {
  const { id, ipfs, playables, staking, address, replaceURISWithGateway = true } = tokenParams;

  const [token, balance, staked] = await Promise.all([
    playables.tokens(id),
    address ? playables.balanceOf(address, id) : BigNumber.from(0),
    address && staking ? staking.getTokenInfo(playables.address, address, id).then((e) => e.amount) : BigNumber.from(0),
  ]);

  if (token.createdAt.eq(0)) {
    throw new NonExistingToken(`Token ${id} does not exist`);
  }

  const data = await all(ipfs.cat(token.uri.replace("ipfs://", "")));
  const buffer = Buffer.from(concat(data));
  let json = JSON.parse(buffer.toString());

  if (replaceURISWithGateway) {
    json = replaceIPFSUris(json);
  }

  return {
    id: id,
    createdAt: new Date(token.createdAt.toNumber() * 1000),
    launchedAt: new Date(token.launchedAt.toNumber() * 1000),
    supply: token.supply.toNumber(),
    minted: token.minted.toNumber(),
    weight: token.weight.toNumber(),
    price: formatBNToEtherFloatFixed(token.price),
    balance: balance.toNumber(),
    staked: staked.toNumber(),
    ...json,
  };
}

export async function getTokens(params: Omit<GetTokenParams, "id">) {
  const { ipfs, playables, staking, address, replaceURISWithGateway = true } = params;
  const tokens: any[] = [];

  for (let i = 1; i <= 100; i++) {
    try {
      const json = await getToken({
        id: i.toString(),
        ipfs,
        playables,
        staking,
        address,
        replaceURISWithGateway,
      });
      tokens.push(json);
    } catch (e) {
      if (e instanceof NonExistingToken) {
        break;
      }
      throw e;
    }
  }
  return tokens;
}

export type GetTokensParams = Omit<GetTokenParams, "ipfs" | "playables" | "staking">;

export async function getTokenSimple(params: GetTokensParams) {
  const { id, address, replaceURISWithGateway = true } = params;

  const ethProvider = new InfuraProvider(NETWORK, INFURA_KEY);
  const playables = await contracts.playables.connect(ethProvider);
  const staking = await contracts.staking.connect(ethProvider);
  const ipfs = await create();

  return getToken({
    id,
    ipfs,
    playables,
    staking,
    address,
    replaceURISWithGateway,
  });
}

export async function getTokensSimple(params: Omit<GetTokensParams, "id">) {
  const { address, replaceURISWithGateway = true } = params;

  const ethProvider = new InfuraProvider(NETWORK, INFURA_KEY);
  const playables = await contracts.playables.connect(ethProvider);
  const staking = await contracts.staking.connect(ethProvider);
  const ipfs = await create();

  return getTokens({
    ipfs,
    playables,
    address,
    staking,
    replaceURISWithGateway,
  });
}

interface Token {
  id: number;
  name: string;
  description: string;
  stakingWeight: number;
  pin: boolean;

  image: Buffer;
  glb: Buffer;
}

export async function createIPFSOpenseaToken(token: Token) {
  const ipfs = await create();

  console.info("Adding screenshot to IPFS");
  const imageHash = await ipfs.add(token.image);
  console.info("Done: ", imageHash.path);

  // Add glb to IPFS
  console.info("Adding glb to IPFS");
  const glbHash = await ipfs.add(token.glb);
  console.info("Done: ", glbHash.path);

  const metadata = {
    description: token.description,
    external_url: "https://magebrotherhood.com/collections/" + token.id,
    image: "ipfs://" + imageHash.path,
    name: token.name,
    animation_url: "ipfs://" + glbHash.path,
    attributes: [
      {
        trait_type: "Staking Weight",
        value: token.stakingWeight,
      },
    ],
  };

  console.info("Adding metadata to IPFS: ", metadata);
  const metadataHash = await ipfs.add(JSON.stringify(metadata));
  console.info("Done: ", metadataHash.path);

  if (token.pin) {
    await ipfs.pin.add(imageHash.path);
    await ipfs.pin.add(glbHash.path);
    await ipfs.pin.add(metadataHash.path);
  }

  return metadataHash.path;
}
