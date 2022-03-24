const INFURA_KEY = process.env.INFURA_KEY || process.env.NEXT_PUBLIC_INFURA_KEY;

if (typeof INFURA_KEY === "undefined") {
  throw new Error(`NEXT_PUBLIC_INFURA_KEY must be a defined environment variable`);
}

export interface Chain {
  id: string;
  token: string;
  label: string;
  rpcUrl: string;
}

export enum ChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Goerli = 5,
  ThunderCoreTestnet = 18,
  Cronos = 25,
  CronosTestnet = 338,
  Kovan = 42,
  BSC = 56,
  BSCTestnet = 97,
  xDai = 100,
  Gnosis = 100,
  ThunderCore = 108,
  Polygon = 137,
  Theta = 361,
  ThetaTestnet = 365,
  Moonriver = 1285,
  Moonbeam = 1284,
  Mumbai = 80001,
  Harmony = 1666600000,
  Palm = 11297108109,
  PalmTestnet = 11297108099,
  Localhost = 1337,
  Hardhat = 31337,
  Fantom = 250,
  Avalanche = 43114,
  Songbird = 19,
  MoonbaseAlpha = 1287,
  OasisEmerald = 42262,
  Stardust = 588,
  OptimismKovan = 69,
  Optimism = 10,
  Arbitrum = 42161,
  ArbitrumRinkeby = 421611,
}

export interface Chains {
  [key: number]: Chain;
}

export const chains: Chains = {
  [ChainId.Mainnet]: {
    id: "0x1",
    token: "ETH",
    label: "Ethereum Mainnet",
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  },
  [ChainId.Ropsten]: {
    id: "0x3",
    token: "tROP",
    label: "Ethereum Ropsten Testnet",
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  },
  [ChainId.Rinkeby]: {
    id: "0x4",
    token: "rETH",
    label: "Ethereum Rinkeby Testnet",
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  },
  [ChainId.Kovan]: {
    id: "0x42",
    token: "kETH",
    label: "Ethereum Kovan Testnet",
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  },
};
