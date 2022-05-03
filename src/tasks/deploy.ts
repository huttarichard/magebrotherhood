import "@nomiclabs/hardhat-ethers";

import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, parseEther } from "@ethersproject/units";
import * as envfile from "envfile";
import { readFileSync } from "fs";
import { task, types } from "hardhat/config";
import { join, resolve } from "path";

import { Coin__factory } from "../artifacts/types/factories/Coin__factory";
import { Exchange__factory } from "../artifacts/types/factories/Exchange__factory";
import { Playables__factory } from "../artifacts/types/factories/Playables__factory";
import { Promoter__factory } from "../artifacts/types/factories/Promoter__factory";
import { Staking__factory } from "../artifacts/types/factories/Staking__factory";
import { timeNowInBN } from "../lib/bn";
import { createClientFromEnv } from "../lib/server/ipfs";

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

  const image = readFileSync(join(__dirname, "../../public/models/tokens/preview/image.gif"));
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
  // todo
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

const updateEnvFile = (envVariables: { key: string; value: any }[]): string => {
  // get `.env` from path of current directory
  const path = resolve(__dirname, "../../.env");
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
