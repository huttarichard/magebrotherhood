import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SuccessCheckmark from "components/ui/SuccessCheckmark";
import { useWeb3Wallet } from "hooks/useWeb3";
import Image from "next/image";
import { useState } from "react";

import Button from "./Button";
import Spinner from "./Spinner";

export interface WalletConnectorProps {
  children?: React.ReactNode;
  onWalletConnected?: () => void;
}

const Row = styled(Grid)`
  background: #232323;
  border-radius: 7px;
  padding: 15px 20px;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};

  ${({ theme }) => theme.breakpoints.up("lg")} {
    border: none;
  }

  img {
    padding-right: 30px;
  }
`;

const Success = styled(Grid)`
  text-align: center;
`;

const Error = styled(Grid)``;

export default function WalletConnector({ children, onWalletConnected }: WalletConnectorProps) {
  const { wallets, activating, connect, error } = useWeb3Wallet();
  const [tryagain, setTryAgain] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  if (activating) {
    return <Spinner />;
  }

  if (success) {
    return (
      <Success container direction="column">
        <Grid item container justifyContent="center">
          <Grid item>
            <Typography variant="h5">Connected</Typography>
            <br />
            <SuccessCheckmark />
          </Grid>
        </Grid>
      </Success>
    );
  }

  if (!error || tryagain) {
    return (
      <Box sx={{ width: "100%" }} component="div">
        <Typography variant="h5">Choose your wallet.</Typography>
        <br />

        {children}

        <Grid container direction="column">
          {wallets.map((w, i) => {
            return (
              <Row
                container
                alignItems="center"
                key={i}
                sx={{ marginTop: 1 }}
                onClick={() => {
                  connect(w)
                    .then(() => {
                      setSuccess(true);
                      if (onWalletConnected) setTimeout(onWalletConnected, 1500);
                    })
                    .catch((e) => {
                      console.error(e);
                    })
                    .finally(() => {
                      setTryAgain(false);
                    });
                }}
              >
                <Grid item sx={{ width: 60 }} container alignContent="center" alignItems="center">
                  <Grid item sx={{ height: 40 }}>
                    <Image src={w.logo} height={40} width={40} alt={w.name} />
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{w.name}</Typography>
                </Grid>
              </Row>
            );
          })}
        </Grid>
      </Box>
    );
  }

  return (
    <Error container direction="column">
      <Grid item>
        <Typography variant="h5">Something went wrong.</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">{error.message}</Typography>
        <br />
        <Button text="Try Again" onClick={() => setTryAgain(true)} />
      </Grid>
    </Error>
  );
}
