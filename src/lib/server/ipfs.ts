import { create as createClient } from "ipfs-http-client";

import env from "../env.server";

if (typeof window !== "undefined") {
  throw new Error("do not use ipfs in browser");
}

const IPFS_PUBLIC_KEY = env.INFURA_IPFS_PUBLIC_KEY;
const IPFS_SECRET_KEY = env.INFURA_IPFS_SECRET_KEY;
const IPFS_GATEWAY = env.INFURA_IPFS_GATEWAY;
const INFURA_IPFS_NODE = env.INFURA_IPFS_NODE;

function authorization() {
  const buff = Buffer.from(IPFS_PUBLIC_KEY + ":" + IPFS_SECRET_KEY);
  return "Basic " + buff.toString("base64");
}

export async function createClientFromEnv() {
  return createClient({
    url: INFURA_IPFS_NODE,
    headers: {
      Authorization: authorization(),
    },
  });
}

export function replaceIPFSUrisWithGateway(obj: any) {
  for (const prop in obj) {
    if (!obj.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof obj[prop] === "object") {
      obj[prop] = replaceIPFSUrisWithGateway(obj[prop]);
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
