import { ChainId } from "./chains";

const INFURA_KEY = process.env.NEXT_PUBLIC_INFURA_KEY;

if (typeof INFURA_KEY === "undefined") {
  throw new Error(`NEXT_PUBLIC_INFURA_KEY must be a defined environment variable`);
}

export { INFURA_KEY };

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
export const INFURA_NETWORK_URLS: { [key in ChainId]: string } = {
  [ChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [ChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  [ChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  [ChainId.GOERLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  [ChainId.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  [ChainId.OPTIMISM]: `https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`,
  [ChainId.OPTIMISTIC_KOVAN]: `https://optimism-kovan.infura.io/v3/${INFURA_KEY}`,
  [ChainId.ARBITRUM_ONE]: `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
  [ChainId.ARBITRUM_RINKEBY]: `https://arbitrum-rinkeby.infura.io/v3/${INFURA_KEY}`,
  [ChainId.POLYGON]: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
  [ChainId.POLYGON_MUMBAI]: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
};
