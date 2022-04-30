import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import StakedItems from "components/Staking/StakedItems";
import UnstakedItems from "components/Staking/UnstakedItems";
import Button from "components/ui/Button";
import { useWeb3ConnectWindow } from "components/ui/WalletConnectWindow";
import { useStakingContract } from "hooks/useContract";
import { useWeb3Remote, useWeb3Wallet } from "hooks/useWeb3";
import { formatBNToEtherFloat } from "lib/bn";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PageLayout } from "../components/Layout/Layout";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  flex-direction: column;
  padding-top: 30px;
  padding: 15px;

  .head {
    border-bottom: 1px solid #303030;
    padding-bottom: 30px;
  }

  .tostake {
    padding: 15px;
    margin-bottom: 30px;
  }

  .image {
    background: white;
    border-radius: 6px;
  }

  .title {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 700;

    span {
      padding-left: 10px;
    }
  }

  .table {
    padding: 15px;
    border-radius: 4px;
    font-size: 1.5rem;
    font-weight: 700;
    min-width: 300px;
    width: 100%;
    border: 1px solid #ccc;
  }
`;

export default function StakingPage() {
  const web3 = useWeb3Wallet();
  const account = web3?.accounts?.[0];
  const window = useWeb3ConnectWindow();
  const remote = useWeb3Remote();
  const staking = useStakingContract(remote);
  const [stakingEpoch, setStakingEpoch] = useState<number[]>([0, 0, 0]);

  if (staking.error) {
    throw staking.error;
  }

  useEffect(() => {
    if (!staking.contract) return;

    Promise.all([
      staking.contract?.getCurrentCycle(),
      staking.contract?.getCurrentPeriod(),
      staking.contract?.totalRewardsPool(),
    ]).then(([cycle, period, pool]) => {
      setStakingEpoch([cycle as number, period as number, formatBNToEtherFloat(pool)]);
    });
  }, [staking]);

  const connectWallet = (
    <div style={{ maxWidth: 300, padding: "0 1rem" }}>
      <br />
      <Button text="Connect Wallet" important distorted borders onClick={window.connect} />
    </div>
  );

  return (
    <PageLayout title="Staking" description="Earn Brotherhood Coins by staking. Take your NFT and start staking today.">
      <Wrapper>
        <div className="head">
          <Typography variant="h3">Staking</Typography>
          <br />

          <Grid container justifyContent="center" alignItems="center">
            <Grid item sm={8}>
              <Typography variant="body1">
                Is a vital and key component of our ecosystem. It allows for equal distribution of tokens, it rewards
                long term investors and prevents cheating in game. More about staking in out &nbsp;
                <Link href="/paper">
                  <a>LITEPAPER.</a>
                </Link>
              </Typography>
            </Grid>

            <Grid item sm={4} padding={2}>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Period</td>
                    <td>{stakingEpoch[1]}</td>
                  </tr>
                  <tr>
                    <td>Cycle</td>
                    <td>{stakingEpoch[0]}</td>
                  </tr>
                  <tr>
                    <td>Rewards pool</td>
                    <td>{stakingEpoch[2]} BHC</td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          </Grid>
        </div>

        <br />

        {web3.connected && account ? (
          <>
            <UnstakedItems account={account} />
            <br />
            <StakedItems account={account} />
          </>
        ) : (
          connectWallet
        )}
      </Wrapper>
    </PageLayout>
  );
}
