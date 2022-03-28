import { Signer } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";
import { ICoin, ICoin__factory } from "artifacts/types";
import { IStaking, IStaking__factory } from "artifacts/types";

import { ChainId } from "./chains";

export type Contract = ICoin | IStaking;
export type ContractName = "Coin" | "Staking";
export type ContractFactory = (signer: Signer | Provider) => Contract;

export interface ContractDefinition {
  address?: string;
  connect: ContractFactory;
}

export interface Contracts {
  Coin: {
    [key: number]: ContractDefinition;
  };
  Staking: {
    [key: number]: ContractDefinition;
  };
}

const CoinMainnetAddress = process.env.NEXT_PUBLIC_MAINNET_COIN_ADDRESS || process.env.MAINNET_COIN_ADDRESS;
const CoinRinkebyAddress = process.env.NEXT_PUBLIC_RINKEBY_COIN_ADDRESS || process.env.RINKEBY_COIN_ADDRESS;

const Coin = {
  [ChainId.Mainnet]: {
    connect: (signer: Signer | Provider) => {
      return ICoin__factory.connect(CoinMainnetAddress as string, signer);
    },
    address: CoinMainnetAddress,
  },
  [ChainId.Rinkeby]: {
    connect: (signer: Signer | Provider) => {
      return ICoin__factory.connect(CoinRinkebyAddress as string, signer);
    },
    address: CoinRinkebyAddress,
  },
};

const StakingMainnetAddress = process.env.NEXT_PUBLIC_MAINNET_STAKING_ADDRESS || process.env.MAINNET_STAKING_ADDRESS;
const StakingRinkebyAddress = process.env.NEXT_PUBLIC_RINKEBY_STAKING_ADDRESS || process.env.RINKEBY_STAKING_ADDRESS;

const Staking = {
  [ChainId.Mainnet]: {
    connect: (signer: Signer | Provider) => {
      return IStaking__factory.connect(StakingMainnetAddress as string, signer);
    },
    address: StakingMainnetAddress,
  },
  [ChainId.Rinkeby]: {
    connect: (signer: Signer | Provider) => {
      return IStaking__factory.connect(StakingRinkebyAddress as string, signer);
    },
    address: StakingRinkebyAddress,
  },
};

export const contracts: Contracts = { Coin, Staking };

export async function getContract(c: ContractName, chain: ChainId, signer: Signer | Provider) {
  if (!contracts[c][chain]?.address) {
    return null;
  }
  return contracts[c][chain].connect(signer);
}
