import { Provider } from "@ethersproject/providers";
import { useEthers } from "@usedapp/core";
import { ICoin } from "artifacts/types";
import { ChainId } from "lib/web3/chains";
import { getContract } from "lib/web3/contracts";
import { useEffect, useState } from "react";

export default function useCoinContract() {
  const [contract, setContract] = useState<ICoin | null>(null);
  const { active, library, chainId } = useEthers();
  useEffect(() => {
    if (!active) return;

    const fetch = async () => {
      const instance = await getContract("Coin", chainId as ChainId, library as Provider);
      setContract(instance as ICoin | null);
    };
    fetch();
    return () => {
      if (!contract) return;
      contract.removeAllListeners();
    };
  }, [active, chainId]);

  return contract;
}
