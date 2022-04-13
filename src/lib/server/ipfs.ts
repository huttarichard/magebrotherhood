import { create as createClient, IPFSHTTPClient } from "ipfs-http-client";

if (typeof window !== "undefined") {
  throw new Error("do not use ipfs in browser");
}

const IPFS_PUBLIC_KEY = process.env.INFURA_IPFS_PUBLIC_KEY;
const IPFS_SECRET_KEY = process.env.INFURA_IPFS_SECRET_KEY;
const IPFS_GATEWAY = process.env.INFURA_IPFS_GATEWAY;
const INFURA_IPFS_NODE = process.env.INFURA_IPFS_NODE;

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

interface Token {
  id: number;
  name: string;
  description: string;
  stakingWeight: number;
  pin: boolean;

  image: Buffer;
  glb: Buffer;
}

export async function createIPFSOpenseaToken(client: IPFSHTTPClient, token: Token) {
  console.info("Adding screenshot to IPFS");
  const imageHash = await client.add(token.image);
  console.info("Done: ", imageHash.path);

  // Add glb to IPFS
  console.info("Adding glb to IPFS");
  const glbHash = await client.add(token.glb);
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
  const metadataHash = await client.add(JSON.stringify(metadata));
  console.info("Done: ", metadataHash.path);

  if (token.pin) {
    await client.pin.add(imageHash.path);
    await client.pin.add(glbHash.path);
    await client.pin.add(metadataHash.path);
  }

  return metadataHash.path;
}
