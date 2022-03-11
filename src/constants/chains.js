const ETH = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const MATIC = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

export const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY;

const chains = {
  1: {
    urls: [`https://mainnet.infura.io/v3/${INFURA_KEY}`, `https://cloudflare-eth.com`],
    name: "Mainnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://etherscan.io"],
  },
  3: {
    urls: [`https://ropsten.infura.io/v3/${INFURA_KEY}`],
    name: "Ropsten",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://ropsten.etherscan.io"],
  },
  4: {
    urls: [`https://rinkeby.infura.io/v3/${INFURA_KEY}`],
    name: "Rinkeby",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://rinkeby.etherscan.io"],
  },
  5: {
    urls: [`https://goerli.infura.io/v3/${INFURA_KEY}`],
    name: "Görli",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://gorli.etherscan.io"],
  },
  42: {
    urls: [`https://kovan.infura.io/v3/${INFURA_KEY}`],
    name: "Kovan",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://kovan.etherscan.io"],
  },
  // Optimism
  10: {
    urls: [`https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`, "https://mainnet.optimism.io"],
    name: "Optimism",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
  },
  69: {
    urls: [`https://ropsten.infura.io/v3/${INFURA_KEY}`, "https://kovan.optimism.io"],
    name: "Optimism Kovan",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://kovan-optimistic.etherscan.io"],
  },
  // Arbitrum
  42161: {
    urls: [`https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`, "https://arb1.arbitrum.io/rpc"],
    name: "Arbitrum One",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://arbiscan.io"],
  },
  421611: {
    urls: [`https://arbitrum-rinkeby.infura.io/v3/${INFURA_KEY}`, "https://rinkeby.arbitrum.io/rpc"],
    name: "Arbitrum Testnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://testnet.arbiscan.io"],
  },
  // Polygon
  137: {
    urls: [`https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`, "https://polygon-rpc.com"],
    name: "Polygon Mainnet",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  80001: {
    urls: [`https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`],
    name: "Polygon Mumbai",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
};

export default chains;
