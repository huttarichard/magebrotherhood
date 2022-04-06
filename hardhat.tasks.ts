import "@nomiclabs/hardhat-ethers";

import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, parseEther } from "@ethersproject/units";
import { readFileSync } from "fs";
import { task } from "hardhat/config";
import path from "path";

import { Coin__factory } from "./src/artifacts/types/factories/Coin__factory";
import { Exchange__factory } from "./src/artifacts/types/factories/Exchange__factory";
import { Playables__factory } from "./src/artifacts/types/factories/Playables__factory";
import { Promoter__factory } from "./src/artifacts/types/factories/Promoter__factory";
import { Staking__factory } from "./src/artifacts/types/factories/Staking__factory";
import { createIPFSOpenseaToken } from "./src/lib/ipfs";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.info(account.address);
  }
});

interface DeployParams {
  [key: string]: string;
}

task("deploy", "deploys coin contract", async (taskArgs: DeployParams, hre) => {
  const coinLiquidity = parseEther(taskArgs["coinLiquidity"]);
  const exchangeLiq = parseEther(taskArgs["exchangeLiquidity"]);
  const stakingCycle = parseInt(taskArgs["stakingCycle"]);
  const stakingPeriod = parseInt(taskArgs["stakingPeriod"]);

  // Coin
  console.info("Deploying coin...");
  const Coin = (await hre.ethers.getContractFactory("Coin")) as Coin__factory;
  const coin = await Coin.deploy(coinLiquidity);
  console.info("Coin address: ", coin.address);
  console.info("Coin tx hash: ", coin.deployTransaction.hash);
  console.info("\n");

  // Exchange
  console.info("Deploying exchange (liq: %s)...", formatEther(exchangeLiq));
  const Exchange = (await hre.ethers.getContractFactory("Exchange")) as Exchange__factory;
  const exchange = await Exchange.deploy(coin.address, {
    value: exchangeLiq,
  });
  await exchange.deployed();
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

  console.info("Promoter address: ", promoter.address);
  console.info("Promoter tx hash: ", promoter.deployTransaction.hash);
  console.info("\n");

  console.info("Setting distributor permissions on coin for promoter...");
  await coin.grantRole(await coin.DISTRIBUTOR(), promoter.address);
  console.info("Role granted");
  console.info("\n");

  console.info("Deploying playables...");
  const Playables = (await hre.ethers.getContractFactory("Playables")) as Playables__factory;
  const playables = await Playables.deploy(exchange.address, promoter.address, "ipfs://..");
  await playables.deployed();

  console.info("Playables address: ", playables.address);
  console.info("Playables tx hash: ", playables.deployTransaction.hash);
  console.info("\n");

  console.info("Deploying staking...");
  const Staking = (await hre.ethers.getContractFactory("Staking")) as Staking__factory;
  const staking = await Staking.deploy(stakingCycle, stakingPeriod, coin.address);
  await staking.deployed();

  console.info("Staking address: ", staking.address);
  console.info("Staking tx hash: ", staking.deployTransaction.hash);
  console.info("\n");

  console.info("Setting distributor permissions on coin for promoter...");
  await coin.grantRole(await coin.DISTRIBUTOR(), staking.address);
  console.info("Role granted");
  console.info("\n");

  console.info("Done!");
})
  .addOptionalParam("coinLiquidity", "amount of bhc", "10000000")
  .addOptionalParam("exchangeLiquidity", "amount of eth send to exchange with deploy", "0")
  .addOptionalParam("stakingCycle", "staking cycle in seconds", "60")
  .addOptionalParam("stakingPeriod", "staking period in cycles", "2");

task("playables:token:add", "adds token to contract and ipfs", async (taskArgs: DeployParams, hre) => {
  const id = parseInt(taskArgs["id"]);
  const glb = path.resolve(__dirname, "public/assets", id + ".glb");
  const png = path.resolve(__dirname, "public/assets", id + ".png");

  const glbFile = readFileSync(glb);
  const pngFile = readFileSync(png);
  const stakingWeight = parseInt(taskArgs["stakingWeight"]);

  const hash = await createIPFSOpenseaToken({
    id,
    name: taskArgs["name"],
    description: taskArgs["description"],
    stakingWeight: stakingWeight,
    pin: !!taskArgs["pin"],
    glb: glbFile,
    image: pngFile,
  });

  const Playables = (await hre.ethers.getContractFactory("Playables")) as Playables__factory;
  const playables = Playables.attach(taskArgs["playables"]);

  await playables.setToken(BigNumber.from(id), {
    createdAt: BigNumber.from(Math.floor(Date.now() / 1000)),
    launchedAt: BigNumber.from(Math.floor(Date.now() / 1000)),
    minted: 0,
    price: parseEther(taskArgs["price"]),
    royalty: "",
    supply: BigNumber.from(taskArgs["supply"]),
    uri: "ipfs://" + hash,
    weight: BigNumber.from(stakingWeight),
  });

  console.info("Done!");
})
  .addParam("id", "id of the token")
  .addParam("name", "name of the token")
  .addParam("description", "description of the token")
  .addParam("playables", "address of the playables contract")
  .addParam("price", "price of the token")
  .addParam("supply", "supply of the token")
  .addOptionalParam("stakingWeight", "staking weight for token", "1")
  .addOptionalParam("pin", "staking period in cycles", "");

task("deploy:coin", "deploys coin contract", async (taskArgs, hre) => {
  const Coin = await hre.ethers.getContractFactory("Coin");
  const coin = await Coin.deploy(1000000);
  console.info("coin: ", coin.address, coin.deployTransaction.hash);
});

task("deploy:affiliate", "deploys affiliate contract", async (taskArgs: { coin: string }, hre) => {
  const Affiliate = await hre.ethers.getContractFactory("Affiliate");
  const affiliate = await Affiliate.deploy(taskArgs.coin);
  console.info("affiliate: ", affiliate.address, affiliate.deployTransaction.hash);
}).addParam("coin", "the coin contract");

task("deploy:playables", "deploys playables contract", async (taskArgs: { coin: string; affiliate: string }, hre) => {
  const Playables = await hre.ethers.getContractFactory("Playables");
  const playables = await Playables.deploy(taskArgs.coin, taskArgs.affiliate, "");
  console.info("playables: ", playables.address, playables.deployTransaction.hash);
})
  .addParam("coin", "the coin contract")
  .addParam("affiliate", "the affiliate contract");

task(
  "deploy:staking",
  "deploys staking contract",
  async (taskArgs: { coin: string; cycleLengthInSeconds: string; periodLengthInCycles: string }, hre) => {
    const Playables = await hre.ethers.getContractFactory("Playables");
    const playables = await Playables.deploy(
      taskArgs.periodLengthInCycles,
      taskArgs.cycleLengthInSeconds,
      taskArgs.coin
    );
    console.info("staking: ", playables.address, playables.deployTransaction.hash);
  }
)
  .addParam("coin", "the coin contract")
  .addParam("cycleLengthInSeconds", "cycle length in seconds")
  .addParam("periodLengthInCycles", "period length in cycles");
