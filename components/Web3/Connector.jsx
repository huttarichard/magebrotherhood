import React, { createContext, useState, useContext, useEffect } from "react";
import Modal, { CONNECT_EVENT } from "./modal";
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
  const [modal] = useState(new Modal());
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);

  const value = {
    provider,
    wallet,
    modal,
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

  if (typeof window !== "undefined") {
    window.connector = value;
  }

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
