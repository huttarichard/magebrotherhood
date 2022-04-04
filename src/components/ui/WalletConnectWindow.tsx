import Drawer from "@mui/material/Drawer";
import { PropsWithChildren } from "react";
import { useWindowSize } from "react-use";
import create from "zustand";

import Modal from "./Modal";
import WalletConnector, { WalletConnectorProps } from "./WalletConnector";

interface State {
  open: boolean;
  connect: () => void;
  close: () => void;
}

export const useWeb3ConnectWindow = create<State>((set) => ({
  open: false,

  connect() {
    set({ open: true });
  },

  close() {
    set({ open: false });
  },
}));

export default function WalletConnectWindow({ children, ...props }: PropsWithChildren<WalletConnectorProps>) {
  const { width } = useWindowSize();
  const { open, close } = useWeb3ConnectWindow();

  const content = (
    <div style={{ padding: "20px" }}>
      <WalletConnector onWalletConnected={close} {...props} />
      {children}
    </div>
  );

  if (width <= 600) {
    return (
      <Drawer anchor="bottom" open={open} onClose={close}>
        {content}
      </Drawer>
    );
  }

  return (
    <Modal open={open} onClose={close} wsx={{ width: "calc(100% - 30px)", maxWidth: "500px" }}>
      {content}
    </Modal>
  );
}
