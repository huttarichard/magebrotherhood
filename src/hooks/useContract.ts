import { Provider } from "@ethersproject/providers";
import { ChainId } from "@usedapp/core";
import { Contract, getContract, Name } from "lib/web3/contracts";
import { useEffect, useState } from "react";

import { Web3 } from "./useWeb3";

export type IContract<T> = {
  contract: T | null;
  error: Error | null;
  ready: boolean;
};

export const UNSUPPORTED_CHAIN = new Error("this chain is not supported yet");

export default function useContract<T extends Contract>(name: Name, ethers: Web3) {
  const [contract, setContract] = useState<IContract<T>>({
    ready: false,
    contract: null,
    error: null,
  });

  useEffect(() => {
    const merge = <D extends keyof IContract<T>>(c: Pick<IContract<T>, D>) => setContract({ ...contract, ...c });

    if (!ethers.resolved) {
      merge({ ready: false, error: null });
      return;
    }

    getContract(name, ethers.chainId as ChainId, ethers.library as Provider)
      .then((contract) => {
        if (!contract) {
          throw UNSUPPORTED_CHAIN;
        }
        if (!contract.address) {
          merge({ ready: false, error: null });
          return;
        }
        merge({ ready: true, contract: contract as T, error: null });
      })
      .catch((e) => {
        merge({ ready: false, contract: null, error: e });
      });

    return () => {
      if (!contract?.contract) return;
      contract.contract.removeAllListeners();
    };
  }, [ethers]);

  return contract;
}
