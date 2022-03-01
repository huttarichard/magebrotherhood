import { createContext, useState, useContext, useEffect } from "react";
import Wallet from "../classes/wallet";

export const WalletContext = createContext({
  wallet: null,
  walletConnected: false,
  connectWallet: () => {},
  disconnectWallet: () => {},
});

export function WalletContextProvider({ children }) {
  const [wallet, setWallet] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    try {
      const w = new Wallet();

      w.connectWithModal();

      setWallet(w);
      setWalletConnected(true);
    } catch (e) {
      // console.log(e);
    }
  };

  const disconnectWallet = async () => {
    await wallet.disconnect();

    setWallet(null);
    setWalletConnected(false);
  };

  const value = {
    wallet,
    walletConnected,
    connectWallet,
    disconnectWallet,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}
