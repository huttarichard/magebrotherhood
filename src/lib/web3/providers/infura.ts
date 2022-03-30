import env from "lib/env";

import { ChainId } from "../chains";

export interface Chains {
  [key: number]: string;
}

export const chains: Chains = {
  [ChainId.Mainnet]: `https://mainnet.infura.io/v3/${env.INFURA_KEY}`,
  [ChainId.Rinkeby]: `https://rinkeby.infura.io/v3/${env.INFURA_KEY}`,
};
