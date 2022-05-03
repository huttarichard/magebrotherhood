import "@nomiclabs/hardhat-ethers";

import { BigNumber } from "@ethersproject/bignumber";
import { readFileSync } from "fs";
import { glob } from "glob";
import { task } from "hardhat/config";
import path, { dirname, join } from "path";

import { Playables } from "../artifacts/types/Playables";
import { timeToBN } from "../lib/bn";
import { createClientFromEnv, replaceIPFSUrisWithGateway } from "../lib/server/ipfs";
import { OpenseaMetadata } from "../lib/server/tokens";

task("playables:tokens:bootstrap", "adds tokens to contract and ipfs", async (taskArgs, hre) => {
  const [owner] = await hre.ethers.getSigners();
  const ipfs = await createClientFromEnv();

  const PLAYABLES_ADDRESS = process.env.PLAYABLES_ADDRESS as string;
  // const EXCHANGE_ADDRESS = process.env.EXCHANGE_ADDRESS as string;
  const Playables = await hre.ethers.getContractFactory("Playables");
  const playables = Playables.attach(PLAYABLES_ADDRESS).connect(owner) as Playables;

  const models = path.resolve(__dirname, "../../public/models/tokens", "**/index.json");
  const tokens: Playables.TokenStruct[] = [];

  const files = glob.sync(models);
  for (const file of files) {
    console.info("Adding token from file: ", file);

    const json = JSON.parse(readFileSync(file, "utf8"));
    const dir = dirname(file);

    const token = await playables.tokens(json.id);
    if (token.createdAt.toNumber() > 0) {
      console.info("Token with id ", json.id, " already exists");
      continue;
    }

    if (!json.revealed) {
      tokens.push({
        createdAt: timeToBN(new Date(json.created_at)),
        launchedAt: timeToBN(new Date(json.launched_at)),
        minted: BigNumber.from(0),
        price: json.price_wei,
        supply: BigNumber.from(json.supply),
        weight: BigNumber.from(json.staking_weight),
        revealed: false,
        uri: "",
      });
      continue;
    }

    const image = readFileSync(join(dir, "preview.jpg"));
    const imageHash = await ipfs.add(image);

    const glb = readFileSync(join(dir, "model.glb"));
    const glbHash = await ipfs.add(glb);

    const usdz = readFileSync(join(dir, "model.usdz"));
    const usdzHash = await ipfs.add(usdz);

    const metadata: OpenseaMetadata = {
      id: json.id,
      name: json.name,
      description: json.description,
      external_url: json.external_url,
      image: "ipfs://" + imageHash.path,
      animation_url: "ipfs://" + glbHash.path,
      models: {
        glb: "ipfs://" + glbHash.path,
        usdz: "ipfs://" + usdzHash.path,
      },
      attributes: json.attributes,
    };

    const metadataHash = await ipfs.add(JSON.stringify(metadata));

    const tokenData: Playables.TokenStruct = {
      createdAt: timeToBN(new Date(json.created_at)),
      launchedAt: timeToBN(new Date(json.launched_at)),
      minted: BigNumber.from(0),
      price: json.price_wei,
      supply: BigNumber.from(json.supply),
      uri: "ipfs://" + metadataHash.path,
      weight: BigNumber.from(json.staking_weight),
      revealed: true,
    };

    const tokenId = BigNumber.from(json.id);

    await playables.setToken(tokenId, tokenData);

    await ipfs.pin.add(imageHash.path);
    await ipfs.pin.add(glbHash.path);
    await ipfs.pin.add(usdzHash.path);
    await ipfs.pin.add(metadataHash.path);

    console.info("Metadata: ", replaceIPFSUrisWithGateway(metadata));
    tokens.push(tokenData);
  }

  console.info("Updating contract...");
  await playables.addTokens(tokens);

  console.info("Done!");
});
