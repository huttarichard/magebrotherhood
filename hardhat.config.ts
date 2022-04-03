import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ganache";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "tsconfig-paths/register";

import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import { task } from "hardhat/config";

dotenv.config();

const INFURA_KEY = process.env.INFURA_KEY;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.info(account.address);
  }
});

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

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    artifacts: "src/artifacts",
  },
  networks: {
    hardhat: {
      gasPrice: 875000000,
      loggingEnabled: false,
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    ganache: {
      url: "http://127.0.0.1:7545",
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  gasReporter: {
    // enabled: process.env.REPORT_GAS !== undefined,
    enabled: true,
    coinmarketcap: "83d01702-c240-4a23-8393-f2d9134105bf",
    currency: "USD",
    gasPrice: 80,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: "src/artifacts/types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    // externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
};

export default config;
