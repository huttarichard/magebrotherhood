import { ChainId } from "./chains";

export enum NetworkType {
  L1,
  L2,
}

interface ChainInfo {
  readonly networkType: NetworkType;
  readonly bridge?: string;
  readonly explorer: string;
  readonly label: string;
  readonly nativeCurrency: {
    name: string; // e.g. 'Goerli ETH',
    symbol: string; // e.g. 'gorETH',
    decimals: number; // e.g. 18,
  };
}

export type ChainInfoMap = { readonly [chainId: number]: ChainInfo };

export const CHAIN_INFO: ChainInfoMap = {
  [ChainId.MAINNET]: {
    networkType: NetworkType.L1,
    explorer: "https://etherscan.io/",
    label: "Ethereum",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  [ChainId.RINKEBY]: {
    networkType: NetworkType.L1,
    explorer: "https://rinkeby.etherscan.io/",
    label: "Rinkeby",
    nativeCurrency: { name: "Rinkeby Ether", symbol: "rETH", decimals: 18 },
  },
  [ChainId.ROPSTEN]: {
    networkType: NetworkType.L1,
    explorer: "https://ropsten.etherscan.io/",
    label: "Ropsten",
    nativeCurrency: { name: "Ropsten Ether", symbol: "ropETH", decimals: 18 },
  },
  [ChainId.KOVAN]: {
    networkType: NetworkType.L1,
    explorer: "https://kovan.etherscan.io/",
    label: "Kovan",
    nativeCurrency: { name: "Kovan Ether", symbol: "kovETH", decimals: 18 },
  },
  [ChainId.GOERLI]: {
    networkType: NetworkType.L1,
    explorer: "https://goerli.etherscan.io/",
    label: "Görli",
    nativeCurrency: { name: "Görli Ether", symbol: "görETH", decimals: 18 },
  },
  [ChainId.OPTIMISM]: {
    networkType: NetworkType.L2,
    bridge: "https://gateway.optimism.io/?chainId=1",
    explorer: "https://optimistic.etherscan.io/",
    label: "Optimism",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  [ChainId.OPTIMISTIC_KOVAN]: {
    networkType: NetworkType.L2,
    bridge: "https://gateway.optimism.io/",
    explorer: "https://optimistic.etherscan.io/",
    label: "Optimistic Kovan",
    nativeCurrency: { name: "Optimistic Kovan Ether", symbol: "kovOpETH", decimals: 18 },
  },
  [ChainId.ARBITRUM_ONE]: {
    networkType: NetworkType.L2,
    bridge: "https://bridge.arbitrum.io/",
    explorer: "https://arbiscan.io/",
    label: "Arbitrum",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  [ChainId.ARBITRUM_RINKEBY]: {
    networkType: NetworkType.L2,
    bridge: "https://bridge.arbitrum.io/",
    explorer: "https://rinkeby-explorer.arbitrum.io/",
    label: "Arbitrum Rinkeby",
    nativeCurrency: { name: "Rinkeby Arbitrum Ether", symbol: "rinkArbETH", decimals: 18 },
  },
  [ChainId.POLYGON]: {
    networkType: NetworkType.L1,
    bridge: "https://wallet.polygon.technology/bridge",
    explorer: "https://polygonscan.com/",
    label: "Polygon",
    nativeCurrency: { name: "Polygon Matic", symbol: "MATIC", decimals: 18 },
  },
  [ChainId.POLYGON_MUMBAI]: {
    networkType: NetworkType.L1,
    bridge: "https://wallet.polygon.technology/bridge",
    explorer: "https://mumbai.polygonscan.com/",
    label: "Polygon Mumbai",
    nativeCurrency: { name: "Polygon Mumbai Matic", symbol: "mMATIC", decimals: 18 },
  },
};
