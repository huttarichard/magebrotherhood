import "@nomiclabs/hardhat-ethers";

import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, parseEther } from "@ethersproject/units";
import Table from "cli-table";
import * as envfile from "envfile";
import { readFileSync } from "fs";
import { glob } from "glob";
import { task, types } from "hardhat/config";
import path, { dirname, join } from "path";
import { resolve } from "path";

import { Coin } from "./src/artifacts/types/Coin";
import { Exchange } from "./src/artifacts/types/Exchange";
import { Coin__factory } from "./src/artifacts/types/factories/Coin__factory";
import { Exchange__factory } from "./src/artifacts/types/factories/Exchange__factory";
import { Playables__factory } from "./src/artifacts/types/factories/Playables__factory";
import { Promoter__factory } from "./src/artifacts/types/factories/Promoter__factory";
import { Staking__factory } from "./src/artifacts/types/factories/Staking__factory";
import { Playables } from "./src/artifacts/types/Playables";
import { formatBNToEtherFloatFixed, timeNowInBN, timeToBN } from "./src/lib/bn";
import { createClientFromEnv, replaceIPFSUrisWithGateway } from "./src/lib/server/ipfs";
import { OpenseaMetadata } from "./src/lib/server/tokens";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.info(account.address);
  }
});

interface DeployParams {
  coinLiquidity: number;
  exchangeLiquidity: number;
  stakingCycle: number;
  stakingPeriod: number;
}

interface DeployedContract {
  address: string;
  args: any[];
}
interface DeployArguments {
  Coin?: DeployedContract;
  Exchange?: DeployedContract;
  Promoter?: DeployedContract;
  Playables?: DeployedContract;
  Staking?: DeployedContract;
}

task("deploy", "deploys coin contract", async (taskArgs: DeployParams, hre) => {
  await hre.run("clean");
  await hre.run("compile");

  const coinLiquidity = parseEther(taskArgs.coinLiquidity.toFixed(0));
  const exchangeLiq = parseEther((taskArgs.exchangeLiquidity * 100).toFixed(0)).div(100);
  const stakingCycle = taskArgs.stakingCycle;
  const stakingPeriod = taskArgs.stakingPeriod;

  const args: DeployArguments = {};

  // Coin
  console.info("Deploying coin...");
  const Coin = (await hre.ethers.getContractFactory("Coin")) as Coin__factory;
  const coin = await Coin.deploy(coinLiquidity);
  await coin.deployed();
  args.Coin = {
    address: coin.address,
    args: [coinLiquidity.toString()],
  };
  console.info("Coin address: ", coin.address);
  console.info("Coin tx hash: ", coin.deployTransaction.hash);
  console.info("\n");

  // Exchange
  if (exchangeLiq.eq(BigNumber.from(0))) {
    console.warn(
      "Exchange liquidity is 0, this is not ideal as it will not allow to trade, functions will return errors"
    );
  }
  console.info("Deploying exchange (liq: %s)...", formatEther(exchangeLiq));
  const Exchange = (await hre.ethers.getContractFactory("Exchange")) as Exchange__factory;
  const exchange = await Exchange.deploy(coin.address, {
    value: exchangeLiq,
  });
  await exchange.deployed();
  args.Exchange = {
    address: exchange.address,
    args: [coin.address],
  };

  console.info("Exchange address: ", exchange.address);
  console.info("Exchange tx hash: ", exchange.deployTransaction.hash);
  console.info("\n");

  console.info("Setting distributor permissions on coin for exchange...");
  await coin.grantRole(await coin.DISTRIBUTOR(), exchange.address);
  console.info("Role granted");
  console.info("\n");

  console.info("Deploying promoter...");
  const Promoter = (await hre.ethers.getContractFactory("Promoter")) as Promoter__factory;
  const promoter = await Promoter.deploy(coin.address);
  await promoter.deployed();

  args.Promoter = {
    address: promoter.address,
    args: [coin.address],
  };

  console.info("Promoter address: ", promoter.address);
  console.info("Promoter tx hash: ", promoter.deployTransaction.hash);
  console.info("\n");

  console.info("Setting distributor permissions on coin for promoter...");
  await coin.grantRole(await coin.DISTRIBUTOR(), promoter.address);
  console.info("Role granted");
  console.info("\n");

  console.info("Deploying playables...");
  const ipfs = await createClientFromEnv();

  const image = readFileSync(join(__dirname, "public/models/tokens/preview/image.gif"));
  const imageHash = await ipfs.add(image);

  const metadata = {
    name: "MageBrotherhood Character",
    description: "One of the MageBrotherhood characters that will be revealed soon. Please come back later.",
    external_url: "https://magebrotherhood.com/",
    image: "ipfs://" + imageHash.path,
    animation_url: "https://magebrotherhood.com/frames/preview",
  };

  const metadataHash = await ipfs.add(JSON.stringify(metadata));
  await ipfs.pin.add(metadataHash.path);

  const Playables = (await hre.ethers.getContractFactory("Playables")) as Playables__factory;
  const playables = await Playables.deploy(exchange.address, promoter.address, "ipfs://" + metadataHash.path);
  await playables.deployed();

  args.Playables = {
    address: playables.address,
    args: [exchange.address, promoter.address, "ipfs://" + metadataHash.path],
  };

  console.info("Playables address: ", playables.address);
  console.info("Playables tx hash: ", playables.deployTransaction.hash);
  console.info("Playables metadata: ", JSON.stringify(metadata));
  console.info("\n");

  console.info("Deploying staking...");
  const tmbn = timeNowInBN();
  const Staking = (await hre.ethers.getContractFactory("Staking")) as Staking__factory;
  const staking = await Staking.deploy(stakingCycle, stakingPeriod, tmbn, coin.address);
  await staking.deployed();

  args.Staking = {
    address: staking.address,
    args: [stakingCycle, stakingPeriod, tmbn.toString(), coin.address],
  };

  console.info("Staking address: ", staking.address);
  console.info("Staking tx hash: ", staking.deployTransaction.hash);
  console.info("\n");

  console.info("Setting distributor permissions on coin for promoter...");
  await coin.grantRole(await coin.DISTRIBUTOR(), staking.address);
  console.info("Role granted");
  console.info("\n");

  console.info("Adding playable contract to staking...");
  await staking.addContract(playables.address);
  console.info("Contract added");
  console.info("\n");

  const jsonArgs = JSON.stringify(args);
  const buffer = Buffer.from(jsonArgs);

  const newEnvFile = updateEnvFile([
    {
      key: "COIN_ADDRESS",
      value: `"${coin.address}"`,
    },
    {
      key: "NEXT_PUBLIC_COIN_ADDRESS",
      value: "$COIN_ADDRESS",
    },
    {
      key: "STAKING_ADDRESS",
      value: `"${staking.address}"`,
    },
    {
      key: "NEXT_PUBLIC_STAKING_ADDRESS",
      value: "$STAKING_ADDRESS",
    },
    {
      key: "PROMOTER_ADDRESS",
      value: `"${promoter.address}"`,
    },
    {
      key: "NEXT_PUBLIC_PROMOTER_ADDRESS",
      value: "$PROMOTER_ADDRESS",
    },
    {
      key: "PLAYABLES_ADDRESS",
      value: `"${playables.address}"`,
    },
    {
      key: "NEXT_PUBLIC_PLAYABLES_ADDRESS",
      value: "$PLAYABLES_ADDRESS",
    },
    {
      key: "EXCHANGE_ADDRESS",
      value: `"${exchange.address}"`,
    },
    {
      key: "NEXT_PUBLIC_EXCHANGE_ADDRESS",
      value: "$EXCHANGE_ADDRESS",
    },
    {
      key: "DEPLOY_ARGS",
      value: `"${buffer.toString("base64")}"`,
    },
  ]);

  console.info(newEnvFile);

  console.info("Done!");
})
  .addOptionalParam("coinLiquidity", "amount of bhc", 10000000, types.int)
  .addOptionalParam("exchangeLiquidity", "amount of eth send to exchange with deploy", 0.01, types.float)
  .addOptionalParam("stakingCycle", "staking cycle in seconds", 60, types.int)
  .addOptionalParam("stakingPeriod", "staking period in cycles", 2, types.int);

task("playables:tokens", "adds tokens to contract and ipfs", async (taskArgs, hre) => {
  const [owner] = await hre.ethers.getSigners();
  const ipfs = await createClientFromEnv();

  const PLAYABLES_ADDRESS = process.env.PLAYABLES_ADDRESS as string;
  // const EXCHANGE_ADDRESS = process.env.EXCHANGE_ADDRESS as string;
  const Playables = await hre.ethers.getContractFactory("Playables");
  const playables = Playables.attach(PLAYABLES_ADDRESS).connect(owner) as Playables;

  const models = path.resolve(__dirname, "public/models/tokens", "**/index.json");

  const files = glob.sync(models);
  for (const file of files) {
    console.info("Adding token from file: ", file);

    const json = JSON.parse(readFileSync(file, "utf8"));
    const dir = dirname(file);

    if (!json.revealed) {
      const tokenData: Playables.TokenStruct = {
        createdAt: timeToBN(new Date(json.created_at)),
        launchedAt: timeToBN(new Date(json.launched_at)),
        minted: BigNumber.from(0),
        price: json.price_wei,
        supply: BigNumber.from(json.supply),
        weight: BigNumber.from(json.staking_weight),
        uri: "",
      };

      const tokenId = BigNumber.from(json.id);
      await playables.setToken(tokenId, tokenData);
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
    };

    const tokenId = BigNumber.from(json.id);

    await playables.setToken(tokenId, tokenData);

    await ipfs.pin.add(imageHash.path);
    await ipfs.pin.add(glbHash.path);
    await ipfs.pin.add(usdzHash.path);
    await ipfs.pin.add(metadataHash.path);

    console.info("Metadata: ", replaceIPFSUrisWithGateway(metadata));
  }

  console.info("Done!");
});

task("etherscan", "Verifies all contract with ethersca, keep in mind you have to have .env settup")
  .setAction(async (taskargs, hre) => {
    const DEPLOY_ARGS = process.env.DEPLOY_ARGS as string;
    const args: DeployArguments = JSON.parse(Buffer.from(DEPLOY_ARGS, "base64").toString());

    interface Contract extends DeployedContract {
      name: string;
    }

    const contracts: Contract[] =
      taskargs.contracts === "all"
        ? Object.keys(args).map((e) => ({ name: e, ...args[e] }))
        : taskargs.contracts.split(",").map((c) => {
            const contract = args[c];
            if (!contract) {
              throw new Error(`Contract ${c} not found`);
            }
            return { name: c, ...contract };
          });

    for (const key in contracts) {
      try {
        console.info("\n Contract verification: ", contracts[key].name);

        await hre.run("verify", {
          constructorArgsParams: contracts[key].args.map((e) => e.toString()),
          address: contracts[key].address,
          contractName: contracts[key].name,
        });
      } catch (e) {
        if ((e as Error).message.includes("403 - Forbidden")) {
          // Or rather 403 because etherscan is peice of....
          console.error(
            `${contracts[key].name}:`,
            "403 error, trying again later, this might be due etherscan rate limiting"
          );
          continue;
        }
        console.error(e);
      }
    }
  })
  .addOptionalParam("contracts", "contract you want to verify", "all", types.string);

task("info", "Prints info about current state of the contracts, must have .env settup").setAction(
  async (taskargs, hre) => {
    const [owner] = await hre.ethers.getSigners();
    await hre.run("compile");
    console.info("\n");

    console.info("Network: ", hre.network.name);

    const table = new Table({
      head: ["Stats", "Value"],
    });

    // const STAKING_ADDRESS = process.env.STAKING_ADDRESS as string;
    // const PROMOTER_ADDRESS = process.env.PROMOTER_ADDRESS as string;
    // const PLAYABLES_ADDRESS = process.env.PLAYABLES_ADDRESS as string;

    const COIN_ADDRESS = process.env.COIN_ADDRESS as string;
    console.info("Coin address:", COIN_ADDRESS);

    const coinBytecode = await owner.provider?.getCode(COIN_ADDRESS);
    if (coinBytecode === "0x") {
      console.error("Coin contract not deployed, check --network parameter");
      process.exit(1);
    }

    const Coin = await hre.ethers.getContractFactory("Coin");
    const coin = Coin.attach(COIN_ADDRESS).connect(owner) as Coin;

    const EXCHANGE_ADDRESS = process.env.EXCHANGE_ADDRESS as string;
    console.info("Exchange address:", EXCHANGE_ADDRESS);

    const exchangeBytecode = await owner.provider?.getCode(EXCHANGE_ADDRESS);
    if (exchangeBytecode === "0x") {
      console.error("Exchange contract not deployed, check --network parameter");
      process.exit(1);
    }

    const Exchange = await hre.ethers.getContractFactory("Exchange");
    const exchange = Exchange.attach(EXCHANGE_ADDRESS).connect(owner) as Exchange;

    // BHC Liquidity
    const bhcLiquidity = await coin.balanceOf(coin.address);
    const bhcLiquidityNumber = formatBNToEtherFloatFixed(bhcLiquidity);
    table.push(["BHC Liquidity", bhcLiquidityNumber]);

    // ETH Liquidity
    const ethLiquidity = await owner.provider?.getBalance(exchange.address);
    const ethLiquidityNumber = formatBNToEtherFloatFixed(ethLiquidity);
    table.push(["ETH Exchange Liquidity", ethLiquidityNumber]);

    table.push(["Liquidity Ratio", (ethLiquidityNumber / bhcLiquidityNumber).toFixed(18)]);

    console.info(table.toString());
  }
);

const updateEnvFile = (envVariables: { key: string; value: any }[]): string => {
  // get `.env` from path of current directory
  const path = resolve(__dirname, ".env");
  const data = readFileSync(path, "utf8");

  const parsedFile = envfile.parse(data);
  delete parsedFile["PRIVATE_KEY"];

  envVariables.forEach((envVar: { key: string; value: any }) => {
    if (envVar.key && envVar.value) {
      parsedFile[envVar.key] = envVar.value;
    }
  });

  return envfile.stringify(parsedFile);
};
