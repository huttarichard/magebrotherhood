require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    ganache: {
      url: "http://127.0.0.1:7545",
      gasLimit: 6000000000,
      defaultBalanceEther: 10,
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
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
};
