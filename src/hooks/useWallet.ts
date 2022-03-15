import { ConnectOptions, WalletState } from "@web3-onboard/core";
import { useAtom } from "jotai";

import { walletAtom } from "../store/wallet";

export interface Wallet {
  data: WalletState | null;
  connecting: boolean;
  connect: (options: ConnectOptions) => Promise<void> | void;
  disconnect?: () => Promise<void> | void;
}

export default function useWallet(): Wallet {
  const [{ data, connecting, connect: maybeConnect, disconnect: maybeDisconnect }] = useAtom(walletAtom);

  const connect = (options: ConnectOptions) => {
    if (typeof maybeConnect === "function") {
      maybeConnect(options);
    }
  };

  const disconnect = () => {
    if (typeof maybeDisconnect === "function" && data) {
      maybeDisconnect(data);
    }
  };

  return { data, connecting, connect, disconnect };
}
