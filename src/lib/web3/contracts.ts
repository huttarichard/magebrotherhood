import { Signer } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";
import type { Coin, Exchange, Playables, Promoter, Staking } from "artifacts/types";
import env from "lib/env";

export type { Coin, Exchange, Playables, Promoter, Staking };

export type IContract = Coin | Playables | Promoter | Staking | Exchange;
export type Factory<T extends IContract> = (signer: Signer | Provider) => Promise<T>;

export enum Contract {
  Coin = "coin",
  Staking = "staking",
  Playables = "playables",
  Promoter = "promoter",
  Exchange = "exchange",
}

export interface ContractDefinition<T extends IContract> {
  address?: string;
  connect: Factory<T>;
}

export type ContractInterfaces = {
  [Contract.Coin]: Coin;
  [Contract.Staking]: Staking;
  [Contract.Playables]: Playables;
  [Contract.Promoter]: Promoter;
  [Contract.Exchange]: Exchange;
};

export type ContractFunctions<Z extends Contract> = keyof ContractInterfaces[Z]["functions"];

export type ContractFunctionArguments<
  Z extends Contract,
  X extends ContractFunctions<Z>
> = ContractInterfaces[Z]["functions"][X] extends (...args: infer P) => any ? P : never;

export type Contracts = {
  [Contract.Coin]: ContractDefinition<Coin>;
  [Contract.Staking]: ContractDefinition<Staking>;
  [Contract.Playables]: ContractDefinition<Playables>;
  [Contract.Promoter]: ContractDefinition<Promoter>;
  [Contract.Exchange]: ContractDefinition<Exchange>;
};

export const contracts: Contracts = {
  [Contract.Coin]: {
    connect: async (signer: Signer | Provider) => {
      const { Coin__factory } = await import("artifacts/types/factories/Coin__factory");
      return Coin__factory.connect(env.COIN_ADDRESS, signer);
    },
    address: env.COIN_ADDRESS,
  },
  [Contract.Staking]: {
    connect: async (signer: Signer | Provider) => {
      const { Staking__factory } = await import("artifacts/types/factories/Staking__factory");
      return Staking__factory.connect(env.STAKING_ADDRESS, signer);
    },
    address: env.STAKING_ADDRESS,
  },
  [Contract.Playables]: {
    connect: async (signer: Signer | Provider) => {
      const { Playables__factory } = await import("artifacts/types/factories/Playables__factory");
      return Playables__factory.connect(env.PLAYABLES_ADDRESS, signer);
    },
    address: env.PLAYABLES_ADDRESS,
  },
  [Contract.Promoter]: {
    connect: async (signer: Signer | Provider) => {
      const { Promoter__factory } = await import("artifacts/types/factories/Promoter__factory");
      return Promoter__factory.connect(env.PROMOTER_ADDRESS, signer);
    },
    address: env.PROMOTER_ADDRESS,
  },
  [Contract.Exchange]: {
    connect: async (signer: Signer | Provider) => {
      const { Exchange__factory } = await import("artifacts/types/factories/Exchange__factory");
      return Exchange__factory.connect(env.EXCHANGE_ADDRESS, signer);
    },
    address: env.EXCHANGE_ADDRESS,
  },
};

export async function connectFromEnv<T extends Contract>(signer: Signer | Provider, c: T) {
  const obj = contracts[c];
  if (!obj.address) {
    throw new Error("unsupported contract");
  }
  return obj.connect(signer);
}
