import { ConnectOptions, DisconnectOptions, WalletState } from "@web3-onboard/core";
import { atom } from "jotai";

export interface IWalletAtom {
  data: WalletState | null;
  connecting: boolean;
  connect?: (options: ConnectOptions) => Promise<void>;
  disconnect?: (wallet: DisconnectOptions) => Promise<void>;
}

export const walletAtom = atom<IWalletAtom>({
  data: null,
  connecting: false,
});
