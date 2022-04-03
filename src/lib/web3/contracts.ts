import { Signer } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";
import { ICoin, ICoin__factory as CoinFactory, IStaking__factory as StakingFactory } from "artifacts/types";
import { IStaking } from "artifacts/types";
import env from "lib/env";

export type IContract = ICoin | IStaking;
export type Factory<T extends IContract> = (signer: Signer | Provider) => T;
export type { ICoin, IStaking };

export enum Contract {
  Coin = "coin",
  Staking = "staking",
}

export interface ContractDefinition<T extends IContract> {
  address?: string;
  connect: Factory<T>;
}

export type Contracts = {
  [key in Contract]: ContractDefinition<IContract>;
};

export const contracts: Contracts = {
  [Contract.Coin]: {
    connect: (signer: Signer | Provider) => {
      return CoinFactory.connect(env.COIN_ADDRESS, signer);
    },
    address: process.env.COIN_ADDRESS,
  },
  [Contract.Staking]: {
    connect: (signer: Signer | Provider) => {
      return StakingFactory.connect(env.STAKING_ADDRESS, signer);
    },
    address: process.env.STAKING_ADDRESS,
  },
};

export async function getContract(c: Contract, signer: Signer | Provider) {
  const obj = contracts[c];
  if (!obj.address) return null;
  return obj.connect(signer);
}
