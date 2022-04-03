import { JsonRpcProvider, Provider } from "@ethersproject/providers";
import { Network } from "@web3-react/network";
import { createWeb3ReactStoreAndActions } from "@web3-react/store";
import type { Actions, Web3ReactStore } from "@web3-react/types";
import { Connector, Web3ReactState } from "@web3-react/types";
import env from "lib/env";
import { ConnectorFactory, IProviderInfo, METAMASK } from "lib/web3/wallets";
import { useEffect, useState } from "react";
import create from "zustand";

if (!env.INFURA_KEY) {
  throw new Error("process.env.INFURA_KEY is not defined");
}

const supportedWallets: IProviderInfo[] = [METAMASK];

export interface Web3Wallet extends Web3ReactState {
  resolved: boolean;
  connector: Connector | null;
  provider: Provider | null;
  store: Web3ReactStore;
  actions: Actions;
  wallets: IProviderInfo[];
  connect: (provider: IProviderInfo) => Promise<void>;
}

export const useWeb3WalletStore = create<Web3Wallet>((set) => {
  const [store, actions] = createWeb3ReactStoreAndActions([env.NETWORK]);

  // store.subscribe(async (s) => {
  //   return set({ ...s });
  // });

  store.subscribe((s) => set({ ...s }));

  const connect = async (p: IProviderInfo) => {
    const connector = p.connector as ConnectorFactory;
    const [instance, provider] = await connector(actions);
    return set({ connector: instance, provider, resolved: true });
  };

  return {
    store: store,
    actions: actions,
    connector: null,
    provider: null,
    resolved: false,
    wallets: supportedWallets,
    ...store.getState(),

    connect,
  };
});

export interface Web3Network extends Web3ReactState {
  resolved: boolean;
  connector: Connector | null;
  provider: Provider | null;
  chainId: number | undefined;
  activating: boolean;
  error: Error | undefined;
  store: Web3ReactStore;
  actions: Actions;
}

export const useWeb3Network = create<Web3Network>((set) => {
  const [store, actions] = createWeb3ReactStoreAndActions([env.NETWORK]);

  const networksrpc = {
    [env.NETWORK]: ["https://rinkeby.infura.io/v3/" + env.INFURA_KEY],
  };

  const network = new Network(actions, networksrpc);
  network
    .activate()
    .then(() => {
      const provider = network.customProvider as JsonRpcProvider;
      set({ resolved: true, connector: network, provider });
    })
    .catch((e) => {
      set({ resolved: true, error: e });
    });

  store.subscribe((s) => set({ ...s }));

  return {
    store: store,
    actions: actions,
    provider: null,
    connector: null,
    resolved: false,
    ...store.getState(),
  };
});

interface Web3 {
  provider: Provider | null;
  connector: Connector | null;
  wallet: Web3Wallet;
  network: Web3Network;
  error?: Error | undefined;
  isWallet: boolean;
  resolved: boolean;
}

export default function useWeb3(): Web3 {
  const wallet = useWeb3WalletStore();
  const network = useWeb3Network();

  const [state, setState] = useState<Web3>({
    error: network.error,
    resolved: network.resolved,
    connector: network.connector,
    provider: network.provider,
    wallet,
    network,
    isWallet: false,
  });

  useEffect(() => {
    setState(
      wallet.resolved && !wallet.error
        ? {
            error: wallet.error,
            resolved: wallet.resolved,
            connector: wallet.connector,
            provider: wallet.provider,
            wallet,
            isWallet: true,
            network,
          }
        : {
            error: network.error,
            resolved: network.resolved,
            connector: network.connector,
            provider: network.provider,
            wallet,
            isWallet: false,
            network,
          }
    );
  }, [network, wallet]);

  return state;
}
