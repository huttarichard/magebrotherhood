import { Signer } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";
import { Playables, Playables__factory } from "artifacts/types";
import env from "lib/env";

import { ChainId } from "../chains";
export type { Playables };

export function connector(address: string, signer: Signer | Provider) {
  return Playables__factory.connect(address as string, signer);
}

const contracts = {
  [ChainId.Mainnet]: {
    connect: connector.bind(null, env.MAINNET_PLAYABLES_ADDRESS),
    address: env.MAINNET_PLAYABLES_ADDRESS,
  },
  [ChainId.Rinkeby]: {
    connect: connector.bind(null, env.RINKEBY_PLAYABLES_ADDRESS),
    address: env.RINKEBY_PLAYABLES_ADDRESS,
  },
};

export default contracts;
