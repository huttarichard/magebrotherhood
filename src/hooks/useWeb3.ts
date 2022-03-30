import { JsonRpcProvider } from "@ethersproject/providers";
import { Chain, useConfig, useEthers, Web3Ethers } from "@usedapp/core";
import env from "lib/env";
import { useEffect, useState } from "react";

export type Web3 = Web3Ethers & {
  shouldSwitch?: boolean;
  chain?: Chain;
  library?: JsonRpcProvider;
  resolved: boolean;
};

export default function useWeb3(): Web3 {
  const config = useConfig();
  const eths = useEthers();

  const [web3, setWeb3] = useState<Web3>({
    ...eths,
    resolved: false,
    shouldSwitch: false,
  });

  // Manage web3 with ethers and read only rpc node
  useEffect(() => {
    const shouldSwitch = (eths.chainId ?? config.readOnlyChainId) !== env.DEFAULT_NETWORK;

    const payload: Web3 = {
      ...eths,
      chainId: eths.chainId,
      chain: config.networks?.find((e) => e.chainId === eths.chainId),
      shouldSwitch,
      resolved: false,
    };

    setWeb3(payload);

    payload.resolved = true;

    if (eths.error || !eths.library) {
      setWeb3(payload);
      return;
    }

    eths.library.ready
      .then(() => {
        setWeb3(payload);
      })
      .catch((e) => {
        payload.error = e;
        setWeb3(payload);
      });
  }, [eths.library, eths.chainId, eths.error, config.networks]);

  return web3;
}
