import { BigNumber } from "@ethersproject/bignumber";
import { Provider } from "@ethersproject/providers";
import { Contract, getContract, ICoin, IContract, IStaking } from "lib/web3/contracts";
import { useEffect, useState } from "react";

import useWeb3 from "./useWeb3";

export type IContractResp<T> = {
  contract: T | null;
  error: Error | null;
  resolved: boolean;
};

export const UNSUPPORTED_CONTRACT = new Error("this contract is not supported yet");

export default function useContract<T extends IContract>(name: Contract) {
  const web3 = useWeb3();

  const [contract, setContract] = useState<IContractResp<T>>({
    resolved: false,
    contract: null,
    error: null,
  });

  useEffect(() => {
    const merge = <D extends keyof IContractResp<T>>(c: Pick<IContractResp<T>, D>) =>
      setContract({ ...contract, ...c });

    if (!web3.resolved) {
      merge({ resolved: false, error: null });
      return;
    }

    getContract(name, web3.provider as Provider)
      .then((contract) => {
        if (!contract) {
          throw UNSUPPORTED_CONTRACT;
        }
        merge({ resolved: true, contract: contract as T, error: null });
      })
      .catch((e) => {
        merge({ resolved: true, contract: null, error: e });
      });

    return () => {
      if (!contract?.contract) return;
      contract.contract.removeAllListeners();
    };
  }, [web3]);

  return contract;
}

export function useCoinContract() {
  return useContract<ICoin>(Contract.Coin);
}

export function useCoinETHPrice(coin: ICoin | null) {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from("0"));
  useEffect(() => {
    if (!coin) return;
    Promise.all([coin.balanceOf(coin.address), coin.provider.getBalance(coin.address)]).then(([cv, eb]) => {
      // const bhc = parseFloat(formatUnits(cv, "ether"));
      // const eth = parseFloat(formatUnits(eb, "ether"));
      setPrice(eb.div(cv));
    });
  }, [coin]);

  return price;
}

export function useStakingContract() {
  return useContract<IStaking>(Contract.Staking);
}
