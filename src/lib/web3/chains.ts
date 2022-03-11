export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
}

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY;

if (typeof INFURA_KEY === "undefined") {
  throw new Error(`NEXT_PUBLIC_INFURA_KEY must be a defined environment variable`);
}

export const rpcs: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [ChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  [ChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  [ChainId.GOERLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  [ChainId.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
};

interface Currency {
  name: string; // e.g. 'Goerli ETH',
  symbol: string; // e.g. 'gorETH',
  decimals: number; // e.g. 18,
}

interface Info {
  readonly explorer: string;
  readonly label: string;
  readonly nativeCurrency: Currency;
}

export type InfoMap = {
  readonly [chainId: number]: Info;
};

export const names = {
  [ChainId.MAINNET]: "mainnet",
  [ChainId.ROPSTEN]: "ropsten",
  [ChainId.RINKEBY]: "rinkeby",
  [ChainId.GOERLI]: "goerli",
  [ChainId.KOVAN]: "kovan",
};

export const info: InfoMap = {
  [ChainId.MAINNET]: {
    explorer: "https://etherscan.io/",
    label: "Ethereum",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  [ChainId.RINKEBY]: {
    explorer: "https://rinkeby.etherscan.io/",
    label: "Rinkeby",
    nativeCurrency: { name: "Rinkeby Ether", symbol: "rETH", decimals: 18 },
  },
  [ChainId.ROPSTEN]: {
    explorer: "https://ropsten.etherscan.io/",
    label: "Ropsten",
    nativeCurrency: { name: "Ropsten Ether", symbol: "ropETH", decimals: 18 },
  },
  [ChainId.KOVAN]: {
    explorer: "https://kovan.etherscan.io/",
    label: "Kovan",
    nativeCurrency: { name: "Kovan Ether", symbol: "kovETH", decimals: 18 },
  },
  [ChainId.GOERLI]: {
    explorer: "https://goerli.etherscan.io/",
    label: "Görli",
    nativeCurrency: { name: "Görli Ether", symbol: "görETH", decimals: 18 },
  },
};
