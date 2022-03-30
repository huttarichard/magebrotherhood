import { Signer } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";
import { IStaking, IStaking__factory } from "artifacts/types";
import env from "lib/env";

import { ChainId } from "../chains";
export type { IStaking };

export function connector(address: string, signer: Signer | Provider) {
  return IStaking__factory.connect(address as string, signer);
}

const contracts = {
  [ChainId.Mainnet]: {
    connect: connector.bind(null, env.MAINNET_STAKING_ADDRESS),
    address: env.MAINNET_STAKING_ADDRESS,
  },
  [ChainId.Rinkeby]: {
    connect: connector.bind(null, env.RINKEBY_STAKING_ADDRESS),
    address: env.RINKEBY_STAKING_ADDRESS,
  },
};

export default contracts;
