import { Signer } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";

import { ChainId } from "../chains";
import { default as coin, ICoin } from "./coin";
import { default as playables, Playables } from "./playables";
import { default as staking, IStaking } from "./staking";

export type Contract = ICoin | IStaking | Playables;
export type Factory<T extends Contract> = (signer: Signer | Provider) => T;
export type { ICoin, IStaking };

export enum Name {
  Coin = "coin",
  Staking = "staking",
  Playables = "playables",
}

export interface ContractDefinition<T extends Contract> {
  address?: string;
  connect: Factory<T>;
}

export type MultiChainContractDefinition<T extends Contract> = Partial<{
  [key in ChainId]: ContractDefinition<T>;
}>;

export type Contracts = {
  [key in Name]: MultiChainContractDefinition<Contract>;
};

export const contracts: Contracts = {
  [Name.Coin]: coin,
  [Name.Staking]: staking,
  [Name.Playables]: playables,
};

console.log("contracts:", contracts);

export async function getContract(c: Name, chain: ChainId, signer: Signer | Provider) {
  const obj = contracts[c]?.[chain];
  if (!obj) return null;
  return obj.connect(signer);
}
