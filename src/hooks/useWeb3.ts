import { JsonRpcProvider, Provider } from "@ethersproject/providers";
import { Network } from "@web3-react/network";
import { createWeb3ReactStoreAndActions } from "@web3-react/store";
import type { Actions, Web3ReactStore } from "@web3-react/types";
import { Connector, Web3ReactState } from "@web3-react/types";
import env from "lib/env";
import { COINBASE, ConnectorFactory, IProviderInfo, METAMASK, WALLETCONNECT } from "lib/web3/wallets";
import create from "zustand";

if (!env.INFURA_KEY) {
  throw new Error("env.INFURA_KEY is not defined");
}

const supportedWallets: IProviderInfo[] = [METAMASK, WALLETCONNECT, COINBASE];

export interface Web3 extends Web3ReactState {
  provider: Provider | null;
  connector: Connector | null;
  isWallet: boolean;
  connected: boolean;
}

export interface Web3Wallet extends Web3 {
  store: Web3ReactStore;
  actions: Actions;
  wallets: IProviderInfo[];
  connect: (provider: IProviderInfo) => Promise<void>;
}

export const useWeb3Wallet = create<Web3Wallet>((set) => {
  const [store, actions] = createWeb3ReactStoreAndActions([env.NETWORK]);

  store.subscribe((s) => set({ ...s }));

  const connect = async (p: IProviderInfo) => {
    const connector = p.connector as ConnectorFactory;
    const [instance, provider] = await connector(actions);
    const state = store.getState();
    if (state.error) {
      set({ error: state.error, connected: false });
      throw state.error;
    }
    return set({ connector: instance, provider, connected: true });
  };

  return {
    provider: null,
    connector: null,
    isWallet: true,
    connected: false,
    store: store,
    actions: actions,
    wallets: supportedWallets,
    ...store.getState(),

    connect,
  };
});

export interface Web3Network extends Web3 {
  store: Web3ReactStore;
  actions: Actions;
}

export const useWeb3Remote = create<Web3Network>((set) => {
  const [store, actions] = createWeb3ReactStoreAndActions([env.NETWORK]);

  const networksrpc: { [key: string]: string[] } = {
    "1": [`https://mainnet.infura.io/v3/${env.INFURA_KEY}`, "https://main-light.eth.linkpool.io"],
    "4": [`https://rinkeby.infura.io/v3/${env.INFURA_KEY}`, "https://rinkeby-light.eth.linkpool.io"],
    "5": [`https://goerli.infura.io/v3/${env.INFURA_KEY}`, "https://goerli-light.eth.linkpool.io"],
  };

  const network = new Network(actions, {
    [env.NETWORK]: networksrpc[env.NETWORK.toString()],
  });

  network
    .activate()
    .then(() => {
      const provider = network.customProvider as JsonRpcProvider;
      set({ connected: true, connector: network, provider });
    })
    .catch((e) => {
      set({ connected: false, error: e });
    });

  store.subscribe((s) => set({ ...s }));

  return {
    provider: null,
    connector: null,
    isWallet: false,
    connected: false,
    store: store,
    actions: actions,
    ...store.getState(),
  };
});
