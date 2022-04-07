import "@nomiclabs/hardhat-ethers";

import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, parseEther } from "@ethersproject/units";
import * as envfile from "envfile";
import { readFileSync } from "fs";
import { task, types } from "hardhat/config";
import path from "path";
import { resolve } from "path";

// import { Playables } from "./src/artifacts/types/Playables";
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
  const coinLiquidity = parseEther(taskArgs.coinLiquidity.toFixed(0));
  const exchangeLiq = parseEther(taskArgs.exchangeLiquidity.toFixed(0));
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
  const Playables = (await hre.ethers.getContractFactory("Playables")) as Playables__factory;
  const playables = await Playables.deploy(exchange.address, promoter.address, "ipfs://..");
  await playables.deployed();

  args.Playables = {
    address: playables.address,
    args: [exchange.address, promoter.address, "ipfs://.."],
  };

  console.info("Playables address: ", playables.address);
  console.info("Playables tx hash: ", playables.deployTransaction.hash);
  console.info("\n");

  console.info("Deploying staking...");
  const Staking = (await hre.ethers.getContractFactory("Staking")) as Staking__factory;
  const staking = await Staking.deploy(stakingCycle, stakingPeriod, coin.address);
  await staking.deployed();

  args.Staking = {
    address: staking.address,
    args: [stakingCycle, stakingPeriod, coin.address],
  };

  console.info("Staking address: ", staking.address);
  console.info("Staking tx hash: ", staking.deployTransaction.hash);
  console.info("\n");

  console.info("Setting distributor permissions on coin for promoter...");
  await coin.grantRole(await coin.DISTRIBUTOR(), staking.address);
  console.info("Role granted");
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
  .addOptionalParam("exchangeLiquidity", "amount of eth send to exchange with deploy", 0, types.int)
  .addOptionalParam("stakingCycle", "staking cycle in seconds", 60, types.int)
  .addOptionalParam("stakingPeriod", "staking period in cycles", 2, types.int);

interface AddTokensParams {
  id: number;
  name: string;
  description: string;
  playables: string;
  royalty: string;
  price: number;
  supply: number;
  stakingWeight: number;
  pin: boolean;
}

// Example:
// yarn hardhat --network "rinkeby" playables:token:add
//   --id 1
//   --name "Knight"
//   --description "Warrior"
//   --playables "0xC91a8C5C72d0255576a9C59fd2bc897D403D8eaF"
//   --royalty "0xC91a8C5C72d0255576a9C59fd2bc897D403D8eaF"
//   --price 0.01
//   --supply 800

task("playables:token:add", "adds token to contract and ipfs", async (taskArgs: AddTokensParams, hre) => {
  const [owner] = await hre.ethers.getSigners();

  const id = taskArgs.id;
  const glb = path.resolve(__dirname, "public/models", id + ".glb");
  const png = path.resolve(__dirname, "public/images/tokens", id + ".png");

  const glbFile = readFileSync(glb);
  const pngFile = readFileSync(png);
  const stakingWeight = taskArgs.stakingWeight;

  const hash = await createIPFSOpenseaToken({
    id,
    name: taskArgs["name"],
    description: taskArgs["description"],
    stakingWeight: stakingWeight,
    pin: !!taskArgs["pin"],
    glb: glbFile,
    image: pngFile,
  });

  const Playables = await hre.ethers.getContractFactory("Playables");
  const playables = Playables.attach(taskArgs.playables).connect(owner);

  console.info("Token: ", BigNumber.from(id).toString());

  console.info({
    createdAt: BigNumber.from(Math.floor(Date.now() / 1000)).toString(),
    launchedAt: BigNumber.from(Math.floor(Date.now() / 1000)).toString(),
    minted: 0,
    price: parseEther(taskArgs.price.toFixed(8)).toString(),
    royalty: taskArgs.royalty,
    supply: BigNumber.from(taskArgs["supply"]).toString(),
    uri: "ipfs://" + hash,
    weight: BigNumber.from(stakingWeight).toString(),
  });

  await playables.setToken(BigNumber.from(id), {
    createdAt: BigNumber.from(Math.floor(Date.now() / 1000)),
    launchedAt: BigNumber.from(Math.floor(Date.now() / 1000)),
    minted: 0,
    price: parseEther(taskArgs.price.toFixed(8)),
    royalty: taskArgs.royalty,
    supply: BigNumber.from(taskArgs["supply"]),
    uri: "ipfs://" + hash,
    weight: BigNumber.from(stakingWeight),
  });

  console.info("Done!");
})
  .addParam("id", "id of the token", null, types.int)
  .addParam("name", "name of the token", null, types.string)
  .addParam("description", "description of the token", null, types.string)
  .addParam("playables", "address of the playables contract", null, types.string)
  .addParam("royalty", "address of the roaylty receiver", null, types.string)
  .addParam("price", "price of the token", null, types.float)
  .addParam("supply", "supply of the token", null, types.int)
  .addOptionalParam("stakingWeight", "staking weight for token", 1, types.int)
  .addOptionalParam("pin", "staking period in cycles", false, types.boolean);

task("etherscan", "Compiles the entire project, building all artifacts")
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
