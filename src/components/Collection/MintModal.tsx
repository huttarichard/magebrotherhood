import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Button from "components/ui/Button";
import TransactionStepper from "components/ui/TransactionStepper";
import { StakingItem } from "pages/staking";
import { useState } from "react";
import { useWindowSize } from "react-use";

import Modal from "../ui/Modal";

interface MintModalProps {
  open: boolean;
  handleOpenState: (state: boolean) => void;
  stakeQueue: StakingItem[];
}

export default function MintModal({ open, handleOpenState }: MintModalProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hash, setHash] = useState<string | undefined>(undefined);
  const { width } = useWindowSize();

  const mockTransaction = async () => {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    await sleep(1000);

    setActiveStep(1);

    setHash("0x62cddbf99211253d6fb9db04e2e2a5d1931a0b01db1c65ecf237bd7216a8518d");

    await sleep(1000);

    setActiveStep(2);

    await sleep(1000);

    setActiveStep(3);
  };

  const resetTransaction = () => {
    setActiveStep(0);
    setHash(undefined);
  };

  const steps = [
    {
      error: false,
      label: "Initiating",
      labelOptional: "GO!",
      content: (
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis veritatis quia eligendi ipsum ex tempore
          sapiente ea consequatur quisquam fugiat corrupti minima, aut omnis. Reprehenderit non facilis repellendus
          praesentium architecto.
        </p>
      ),
    },
    {
      error: false,
      label: "Waiting for confirmation",
      labelOptional: "Wait for it...",
      content: (
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati autem quisquam similique magni architecto
          voluptatibus qui eius sit iure eveniet libero eum, quia, sapiente minima molestias eaque modi ducimus
          voluptatum?
        </p>
      ),
    },
    {
      error: false,
      label: "Finalizing",
      labelOptional: "Almost there!",
      labelErrorOptional: "Failed!",
      content: (
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, aut officia et possimus ratione, in provident
          magnam minus qui hic odit quis enim praesentium numquam deleniti adipisci aperiam optio quasi? Ipsam inventore
          consequatur accusantium ex? Magni animi, adipisci doloremque temporibus distinctio commodi consequuntur
          tenetur?
        </p>
      ),
    },
  ];

  const content = (
    <div style={{ padding: "20px" }}>
      <TransactionStepper steps={steps} activeStep={activeStep} hash={hash} />
      <Grid container flexDirection="column" alignItems="center">
        <Button onClick={() => mockTransaction()} text="Mock transaction" borders distorted />
        <br />
        <button onClick={() => resetTransaction()}>Reset transaction</button>
      </Grid>
    </div>
  );

  // debugger;
  if (width ?? 0 <= 600) {
    console.log("mint drawer");
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => {
          handleOpenState(false);
          setActiveStep(0);
        }}
      >
        {content}
      </Drawer>
    );
  } else {
    console.log("mint modal");

    return (
      <Modal
        modalProps={{
          open,
          onClose: () => {
            handleOpenState(false);
            setActiveStep(0);
          },
        }}
      >
        {content}
      </Modal>
    );
  }
}
