import React, { createContext, useState, useContext, useEffect } from "react";
import Modal, { CONNECT_EVENT } from "./Modal";
import { ethers } from "ethers";

export const ConnectorContext = createContext({
  wallet: null,
  provider: null,
  modal: null,
  connected: false,
  chainId: null,
  connect: null,
  connectTo: null,
});

export class Wallet {
  constructor(provider) {}
}

export function Connector({ children }) {
  const [wallet, setWallet] = useState(null);
  const [modal, setModal] = useState(new Modal());
  const [provider, setProvider] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connected, setConnected] = useState(false);

  const value = {
    provider,
    wallet,
    modal,
    chainId,
    connected,

    async connect() {
      return modal.connect();
    },

    async connectTo(id) {
      return modal.connectTo(id);
    },

    disconnect() {
      setWallet(null);
      setProvider(null);
      setConnected(false);
      setChainId(null);
      modal.clearCachedProvider();
    },
  };

  const onConnect = (instance) => {
    const provider = new ethers.providers.Web3Provider(instance);
    let wallet = new Wallet(provider);
    instance.on("chainChanged", (id) => {
      setChainId(id);
    });
    setProvider(provider);
    setWallet(wallet);
    setConnected(true);
  };

  useEffect(() => modal.on(CONNECT_EVENT, onConnect), [modal]);

  return <ConnectorContext.Provider value={value}>{children}</ConnectorContext.Provider>;
}

export const useConnector = () => useContext(ConnectorContext);

// import { ICoreOptions, ThemeColors, SimpleFunction } from "../helpers";
// export declare class Core {
//     private show;
//     private themeColors;
//     private eventController;
//     private lightboxOpacity;
//     private providerController;
//     private userOptions;
//     constructor(opts?: Partial<ICoreOptions>);
//     get cachedProvider(): string;
//     connect: () => Promise<any>;
//     wconnectTo: (id: string) => Promise<any>;
//     toggleModal(): Promise<void>;
//     on(event: string, callback: SimpleFunction): SimpleFunction;
//     off(event: string, callback?: SimpleFunction): void;
//     clearCachedProvider(): void;
//     setCachedProvider(id: string): void;
//     updateTheme(theme: string | ThemeColors): Promise<void>;
//     private renderModal;
//     private _toggleModal;
//     private onError;
//     private onConnect;
//     private onClose;
//     private updateState;
//     private resetState;
// }
// //# sourceMappingURL=index.d.ts.map
