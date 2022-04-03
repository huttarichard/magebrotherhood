import Drawer from "@mui/material/Drawer";
import { PropsWithChildren } from "react";
import { useWindowSize } from "react-use";

import Modal from "./Modal";
import TransactionStepper, { TransactionStepperProps } from "./TransactionStepper";

interface Props extends TransactionStepperProps {
  open: boolean;
  onClose?: () => void;
}

export default function TransactionWindow({
  open,
  onClose,
  hash,
  activeStep,
  steps,
  children,
}: PropsWithChildren<Props>) {
  const { width } = useWindowSize();

  const content = (
    <div style={{ padding: "20px" }}>
      <TransactionStepper steps={steps} activeStep={activeStep} hash={hash} />
      {children}
    </div>
  );

  if (width <= 600) {
    return (
      <Drawer anchor="bottom" open={open} onClose={onClose}>
        {content}
      </Drawer>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      {content}
    </Modal>
  );
}
