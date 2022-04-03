import { Signer } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";
import type { ICoin, IStaking } from "artifacts/types";
import env from "lib/env";

export type IContract = ICoin | IStaking;
export type Factory<T extends IContract> = (signer: Signer | Provider) => Promise<T>;
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
    connect: async (signer: Signer | Provider) => {
      const { ICoin__factory } = await import("artifacts/types/factories/ICoin__factory");
      return ICoin__factory.connect(env.COIN_ADDRESS, signer);
    },
    address: process.env.COIN_ADDRESS,
  },
  [Contract.Staking]: {
    connect: async (signer: Signer | Provider) => {
      const { IStaking__factory } = await import("artifacts/types/factories/IStaking__factory");
      return IStaking__factory.connect(env.STAKING_ADDRESS, signer);
    },
    address: process.env.STAKING_ADDRESS,
  },
};

export async function load<T extends Contract>(signer: Signer | Provider, c: T) {
  const obj = contracts[c];
  if (!obj.address) {
    throw new Error("unsupported contract");
  }
  return obj.connect(signer);
}

export type LoadedContracts = Partial<{
  [key in Contract]: IContract;
}>;

export async function loadMany(signer: Signer | Provider, names: Contract[]): Promise<LoadedContracts> {
  const promises = names.map((name) => {
    const { connect } = contracts[name];
    return connect(signer);
  });

  const loaded = await Promise.all(promises);

  const result: LoadedContracts = {};

  loaded.forEach((e) => {
    const name = names[loaded.indexOf(e)];
    result[name] = e;
  });

  return result;
}
