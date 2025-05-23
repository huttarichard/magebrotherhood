import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "tsconfig-paths/register";

// import "hardhat-exposed";
import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

// Import tasks
// require("./hardhat.tasks");
require("./src/tasks/accounts");
require("./src/tasks/deploy");
require("./src/tasks/etherscan");
require("./src/tasks/playables");
require("./src/tasks/info");

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
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  gasReporter: {
    // enabled: false,
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
