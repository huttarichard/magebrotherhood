import styled from "@emotion/styled";
import { Provider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { default as MuiStep } from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useWeb3Wallet } from "hooks/useWeb3";
import { Step, useWeb3TransactionPresenter } from "hooks/useWeb3Transaction";
import { useEffect } from "react";
import { useWindowSize } from "react-use";

import Blockchaining from "./Blockchaining";
import Button from "./Button";
import Modal from "./Modal";
import SuccessCheckmark from "./SuccessCheckmark";
import WalletConnector, { WalletConnectorProps } from "./WalletConnector";

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin: 0 0 2rem;
    color: #fff;
    text-align: center;
    font-size: 3rem;
    font-family: "Bebas Neue", sans-serif;
  }
`;

function WalletConnect() {
  const { connected, provider } = useWeb3Wallet();
  const { connectWallet } = useWeb3TransactionPresenter();

  useEffect(() => {
    if (connected) {
      connectWallet(provider as Provider);
    }
  }, [connected]);

  if (connected) {
    return null;
  }

  return <WalletConnector />;
}

function Confirmation() {
  const { params, step, confirmed } = useWeb3TransactionPresenter();

  if (step !== Step.Confirmation) {
    return null;
  }

  if (!params) {
    return null;
  }

  return (
    <Grid container flexDirection="column">
      <Grid item>
        <h2>Confirmation</h2>
        <p>You are about to make an transaction to ethereum network. Please confirm with your wallet.</p>

        <Grid container flexDirection="column">
          <Grid item>
            <b>Action: {params.description.action}</b>
            <p style={{ marginTop: "4px" }}>{params.description.description}</p>
          </Grid>
          <Grid item>
            <b>ETH send: </b>
            {formatUnits(params.description.value, "ether")} ETH
          </Grid>
        </Grid>

        <br />

        <Button text="Proceed" important distorted borders block onClick={confirmed} />
      </Grid>
    </Grid>
  );
}

function Sending() {
  const { step } = useWeb3TransactionPresenter();

  if (step !== Step.Send) {
    return null;
  }

  return <Blockchaining />;
}

function Success() {
  const { hash } = useWeb3TransactionPresenter();

  return (
    <Grid container direction="column">
      <Grid item>
        <SuccessCheckmark style={{ margin: "0 auto" }} />
      </Grid>
      <Grid item sx={{ textAlign: "center" }}>
        <h2>Done!</h2>
        <small style={{ fontSize: "15px", overflowWrap: "anywhere" }}>Hash: {hash}</small>
      </Grid>
    </Grid>
  );
}

function Error() {
  const { error } = useWeb3TransactionPresenter();
  let message = "An error occured";
  const err = error as any;

  if (err && err?.message) {
    message = err?.message;
  }

  if (err && typeof err["reason"] == "string") {
    message = err["reason"];
  }

  if (err && err?.error?.message) {
    message = err?.error?.message;
  }

  message = message.charAt(0).toUpperCase() + message.slice(1);

  return (
    <Grid container direction="column">
      <Grid item>
        <h2>Failed</h2>
        <p>{message}.</p>
      </Grid>
    </Grid>
  );
}

export function Content() {
  const { step } = useWeb3TransactionPresenter();

  const steps = {
    [Step.None]: 0,
    [Step.ConnectWallet]: 0,
    [Step.Confirmation]: 1,
    [Step.Send]: 2,
    [Step.Sucess]: 2,
    [Step.Error]: 2,
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Stepper activeStep={steps[step]} sx={{ mb: 4 }}>
        <MuiStep>
          <StepLabel error={false}>Connect Wallet</StepLabel>
        </MuiStep>
        <MuiStep>
          <StepLabel error={false}>Review</StepLabel>
        </MuiStep>
        <MuiStep>
          <StepLabel error={false}>Send</StepLabel>
        </MuiStep>
      </Stepper>

      <StepContent>
        {step === Step.ConnectWallet && <WalletConnect />}
        {step === Step.Confirmation && <Confirmation />}
        {step === Step.Send && <Sending />}
        {step === Step.Sucess && <Success />}
        {step === Step.Error && <Error />}
      </StepContent>
    </Box>
  );
}

export default function TransactionPresenter({}: WalletConnectorProps) {
  const { width } = useWindowSize();
  const { open, close } = useWeb3TransactionPresenter();

  if (width <= 600) {
    return (
      <Drawer anchor="bottom" open={open} onClose={close}>
        <Content />
      </Drawer>
    );
  }

  return (
    <Modal open={open} onClose={close} wsx={{ width: "calc(100% - 30px)", maxWidth: "600px" }}>
      <Content />
    </Modal>
  );
}
