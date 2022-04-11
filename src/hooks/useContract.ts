import { Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { Playables } from "artifacts/types";
import { Coin, Contract, Exchange, IContract, LoadedContracts, loadMany, Promoter, Staking } from "lib/contracts";
import env from "lib/env";
import { useEffect, useState } from "react";

import { Web3 } from "./useWeb3";

export type IContractsResp = {
  contracts: LoadedContracts;
  error?: Error;
  connected: boolean;
  loading: boolean;
};

export function useMultipleContracts(web3: Web3, names: Contract[]) {
  const [contracts, setContracts] = useState<IContractsResp>({
    connected: false,
    contracts: {},
    loading: false,
  });

  useEffect(() => {
    if (web3.error) {
      return setContracts({
        connected: false,
        contracts: {},
        error: web3.error,
        loading: false,
      });
    }

    if (!web3.connected) {
      return setContracts({
        connected: false,
        contracts: {},
        error: web3.error,
        loading: web3.activating,
      });
    }

    setContracts({
      connected: false,
      contracts: {},
      loading: true,
    });

    loadMany(web3.provider as Provider, names)
      .then((loaded) => {
        return setContracts({
          connected: true,
          contracts: loaded,
          loading: false,
        });
      })
      .catch((e) => {
        return setContracts({
          loading: false,
          error: e,
          contracts: {},
          connected: false,
        });
      });

    return () => {
      const cs = contracts.contracts || {};
      for (const item in Contract) {
        const key = cs[item as Contract];
        if (!key) continue;
        key.removeAllListeners();
      }
    };
  }, [web3]);

  return contracts;
}

export type IContractResp<T> = {
  contract?: T;
  error?: Error;
  connected: boolean;
};

export function useContract<T extends IContract>(web3: Web3, name: Contract): IContractResp<T> {
  const cs = useMultipleContracts(web3, [name]);
  const contract = cs.contracts[name] as T;
  return { connected: cs.connected, error: cs.error, contract };
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

export function useCoinETHPrice(web3: Web3) {
  const { contract } = useCoinContract(web3);
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!contract || !web3.provider) return;

    Promise.all([contract.balanceOf(contract.address), web3.provider.getBalance(env.EXCHANGE_ADDRESS)]).then(
      ([b, e]) => {
        const bhc = parseFloat(formatUnits(b, "ether"));
        const eth = parseFloat(formatUnits(e, "ether"));
        setPrice(eth / bhc);
      }
    );
  }, [contract, web3.provider]);

  return price;
}
