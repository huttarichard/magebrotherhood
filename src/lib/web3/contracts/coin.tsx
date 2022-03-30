import { Signer } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";
import { ICoin, ICoin__factory } from "artifacts/types";
import env from "lib/env";

import { ChainId } from "../chains";
export type { ICoin };

export function connector(address: string, signer: Signer | Provider) {
  return ICoin__factory.connect(address as string, signer);
}

const contracts = {
  [ChainId.Mainnet]: {
    connect: connector.bind(null, env.MAINNET_COIN_ADDRESS),
    address: env.MAINNET_COIN_ADDRESS,
  },
  [ChainId.Rinkeby]: {
    connect: connector.bind(null, env.RINKEBY_COIN_ADDRESS),
    address: env.RINKEBY_COIN_ADDRESS,
  },
};

export default contracts;
