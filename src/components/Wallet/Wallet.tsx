import styled from "@emotion/styled";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import ConnectWallet from "components/Layout/ConnectWallet";
import Paper from "components/ui/Paper";
import Spinner from "components/ui/Spinner";
import { useWeb3Wallet } from "hooks/useWeb3";
import { useState } from "react";

import Assets from "./Assets";
import { Transfer } from "./Transfer";

const Info = styled(Paper)`
  padding: 1rem;

  p {
    margin: 0;
  }
`;

const Card = styled(Paper)`
  padding: 20px;
  margin-bottom: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
  padding-top: 30px;
  max-width: 800px;
  margin: 0 auto;

  .head {
    padding: 20px;
  }

  .body {
    padding: 20px;
  }
`;

enum Filter {
  Assets,
  Transfer,
}

export default function Wallet() {
  const { activating, connected, error, accounts } = useWeb3Wallet();
  const [filter, setFilter] = useState<Filter>(Filter.Assets);
  const [isSubmitting] = useState<boolean>(false);

  // const { resolved, contract, error } = useCoinContract();

  if (error) {
    throw error;
  }

  if (activating) {
    return (
      <Info>
        <Spinner />
      </Info>
    );
  }

  if (!connected) {
    return (
      <Info>
        <p>Please connect your wallet to see assets you own.</p>
        <br />
        <ConnectWallet style={{ maxWidth: 300 }} />
      </Info>
    );
  }

  return (
    <Wrapper>
      <div className="head">
        <Typography variant="h3">Your Wallet</Typography>
        <Typography variant="body2">{accounts?.length ? accounts[0] : ""}</Typography>
      </div>

      <div className="body">
        <Card magical>
          <Tabs value={filter} onChange={(event, newValue) => setFilter(newValue)}>
            <Tab label="Assets" />
            <Tab label="Transfers" />
          </Tabs>

          <br />

          {filter === Filter.Assets && <Assets />}
          {filter === Filter.Transfer && <Transfer />}
        </Card>

        {/* onClick={eths.deactivate} */}
        {/* <Button text={disconnect} distorted borders large /> */}
      </div>
    </Wrapper>
  );
}
