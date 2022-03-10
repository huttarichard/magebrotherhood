import { SupportedChainId } from "./chains";

export enum NetworkType {
  L1,
  L2,
}

interface BaseChainInfo {
  readonly networkType: NetworkType;
  readonly docs: string;
  readonly bridge?: string;
  readonly explorer: string;
  readonly label: string;
  readonly helpCenterUrl?: string;
  readonly nativeCurrency: {
    name: string; // e.g. 'Goerli ETH',
    symbol: string; // e.g. 'gorETH',
    decimals: number; // e.g. 18,
  };
}

export type ChainInfoMap = { readonly [chainId: number]: BaseChainInfo };

export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    networkType: NetworkType.L1,
    docs: "https://docs.uniswap.org/",
    explorer: "https://etherscan.io/",
    label: "Ethereum",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  [SupportedChainId.RINKEBY]: {
    networkType: NetworkType.L1,
    docs: "https://docs.uniswap.org/",
    explorer: "https://rinkeby.etherscan.io/",
    label: "Rinkeby",
    nativeCurrency: { name: "Rinkeby Ether", symbol: "rETH", decimals: 18 },
  },
  [SupportedChainId.ROPSTEN]: {
    networkType: NetworkType.L1,
    docs: "https://docs.uniswap.org/",
    explorer: "https://ropsten.etherscan.io/",
    label: "Ropsten",
    nativeCurrency: { name: "Ropsten Ether", symbol: "ropETH", decimals: 18 },
  },
  [SupportedChainId.KOVAN]: {
    networkType: NetworkType.L1,
    docs: "https://docs.uniswap.org/",
    explorer: "https://kovan.etherscan.io/",
    label: "Kovan",
    nativeCurrency: { name: "Kovan Ether", symbol: "kovETH", decimals: 18 },
  },
  [SupportedChainId.GOERLI]: {
    networkType: NetworkType.L1,
    docs: "https://docs.uniswap.org/",
    explorer: "https://goerli.etherscan.io/",
    label: "Görli",
    nativeCurrency: { name: "Görli Ether", symbol: "görETH", decimals: 18 },
  },
  [SupportedChainId.OPTIMISM]: {
    networkType: NetworkType.L2,
    bridge: "https://gateway.optimism.io/?chainId=1",
    docs: "https://optimism.io/",
    explorer: "https://optimistic.etherscan.io/",
    label: "Optimism",
    helpCenterUrl: "https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  [SupportedChainId.OPTIMISTIC_KOVAN]: {
    networkType: NetworkType.L2,
    bridge: "https://gateway.optimism.io/",
    docs: "https://optimism.io/",
    explorer: "https://optimistic.etherscan.io/",
    label: "Optimistic Kovan",
    helpCenterUrl: "https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ",
    nativeCurrency: { name: "Optimistic Kovan Ether", symbol: "kovOpETH", decimals: 18 },
  },
  [SupportedChainId.ARBITRUM_ONE]: {
    networkType: NetworkType.L2,
    bridge: "https://bridge.arbitrum.io/",
    docs: "https://offchainlabs.com/",
    explorer: "https://arbiscan.io/",
    label: "Arbitrum",
    helpCenterUrl: "https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  },
  [SupportedChainId.ARBITRUM_RINKEBY]: {
    networkType: NetworkType.L2,
    bridge: "https://bridge.arbitrum.io/",
    docs: "https://offchainlabs.com/",
    explorer: "https://rinkeby-explorer.arbitrum.io/",
    label: "Arbitrum Rinkeby",
    helpCenterUrl: "https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum",
    nativeCurrency: { name: "Rinkeby Arbitrum Ether", symbol: "rinkArbETH", decimals: 18 },
  },
  [SupportedChainId.POLYGON]: {
    networkType: NetworkType.L1,
    bridge: "https://wallet.polygon.technology/bridge",
    docs: "https://polygon.io/",
    explorer: "https://polygonscan.com/",
    label: "Polygon",
    nativeCurrency: { name: "Polygon Matic", symbol: "MATIC", decimals: 18 },
  },
  [SupportedChainId.POLYGON_MUMBAI]: {
    networkType: NetworkType.L1,
    bridge: "https://wallet.polygon.technology/bridge",
    docs: "https://polygon.io/",
    explorer: "https://mumbai.polygonscan.com/",
    label: "Polygon Mumbai",
    nativeCurrency: { name: "Polygon Mumbai Matic", symbol: "mMATIC", decimals: 18 },
  },
};
