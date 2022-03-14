import { Chain } from "@web3-onboard/common";

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY;

if (typeof INFURA_KEY === "undefined") {
  throw new Error(`NEXT_PUBLIC_INFURA_KEY must be a defined environment variable`);
}

export const chains: Chain[] = [
  {
    id: "0x1",
    token: "ETH",
    label: "Ethereum Mainnet",
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  },
  {
    id: "0x3",
    token: "tROP",
    label: "Ethereum Ropsten Testnet",
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  },
  {
    id: "0x4",
    token: "rETH",
    label: "Ethereum Rinkeby Testnet",
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  },
  {
    id: "0x89",
    token: "MATIC",
    label: "Matic Mainnet",
    rpcUrl: "https://matic-mainnet.chainstacklabs.com",
  },
];
