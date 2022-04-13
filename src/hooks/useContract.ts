import { Provider } from "@ethersproject/providers";
import { Coin, connectFromEnv, Contract, Exchange, IContract, Playables, Promoter, Staking } from "lib/web3/contracts";
import { useEffect, useState } from "react";

import { Web3 } from "./useWeb3";

export type IContractResp<T> = {
  contract?: T;
  error?: Error;
  connected: boolean;
  loading: boolean;
};

export function useContract<T extends IContract>(web3: Web3, name: Contract): IContractResp<T> {
  const [contracts, setContracts] = useState<IContractResp<T>>({
    connected: false,
    loading: false,
  });

  useEffect(() => {
    if (web3.error) {
      return setContracts({
        connected: false,
        error: web3.error,
        loading: false,
      });
    }

    if (!web3.connected) {
      return setContracts({
        connected: false,
        error: web3.error,
        loading: web3.activating,
      });
    }

    setContracts({
      connected: false,
      loading: true,
    });

    connectFromEnv(web3.provider as Provider, name)
      .then((loaded) => {
        return setContracts({
          connected: true,
          contract: loaded as T,
          loading: false,
        });
      })
      .catch((e) => {
        return setContracts({
          loading: false,
          error: e,
          connected: false,
        });
      });

    return () => {
      if (contracts.contract) {
        contracts.contract.removeAllListeners();
      }
    };
  }, [web3]);

  return contracts;
}

export function useCoinContract(web3: Web3) {
  return useContract<Coin>(web3, Contract.Coin);
}

export function useExchangeContract(web3: Web3) {
  return useContract<Exchange>(web3, Contract.Exchange);
}

export function useStakingContract(web3: Web3) {
  return useContract<Staking>(web3, Contract.Staking);
}

export function usePlayableContract(web3: Web3) {
  return useContract<Playables>(web3, Contract.Playables);
}

export function usePromoterContract(web3: Web3) {
  return useContract<Promoter>(web3, Contract.Promoter);
}
