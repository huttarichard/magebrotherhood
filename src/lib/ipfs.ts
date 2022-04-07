import { create } from "ipfs-http-client";

const IPFS_PUBLIC_KEY = process.env.INFURA_IPFS_PUBLIC_KEY;
const IPFS_SECRET_KEY = process.env.INFURA_IPFS_SECRET_KEY;
const INFURA_IPFS_NODE = process.env.INFURA_IPFS_NODE;

function authorization() {
  const buff = Buffer.from(IPFS_PUBLIC_KEY + ":" + IPFS_SECRET_KEY);
  return "Basic " + buff.toString("base64");
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
  const ipfs = await create({
    url: INFURA_IPFS_NODE,
    headers: {
      Authorization: authorization(),
    },
  });

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
