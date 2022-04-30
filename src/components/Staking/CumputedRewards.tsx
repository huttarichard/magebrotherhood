import { BigNumber } from "@ethersproject/bignumber";
import { Grid } from "@mui/material";
import Button from "components/ui/Button";
import Spinner from "components/ui/Spinner";
import { useStakingContract } from "hooks/useContract";
import { useWeb3Wallet } from "hooks/useWeb3";
import { useWeb3TransactionPresenter } from "hooks/useWeb3Transaction";
import { formatBNToEtherFloatFixed } from "lib/bn";
import { Contract } from "lib/web3/contracts";
import { useEffect, useState } from "react";

export default function CumputedRewards() {
  const web3 = useWeb3Wallet();
  const { contract, error, connected } = useStakingContract(web3);
  const { makeTransaction } = useWeb3TransactionPresenter();

  interface Rewards {
    startPeriod: number;
    periods: number;
    amount: number;
  }
  const [rewards, setRewards] = useState<Rewards>();

  useEffect(() => {
    if (!contract) return;
    contract.estimateRewards(BigNumber.from(1000)).then((result) => {
      setRewards({
        startPeriod: result.startPeriod,
        periods: result.periods,
        amount: formatBNToEtherFloatFixed(result.amount),
      });
    });
  }, [contract]);

  if (error) {
    return <>{error.message}</>;
  }

  if (!connected) {
    return <Spinner />;
  }

  const handleClaim = () => {
    if (!rewards) return;

    makeTransaction({
      contract: Contract.Staking,
      description: {
        action: "Claim rewards",
        description: `You can claim your rewards`,
        value: BigNumber.from("0"),
      },
      fn: "claimRewards",
      args: [BigNumber.from(rewards.periods)],
    });
  };

  if (!rewards) {
    return null;
  }

  return (
    <Grid container>
      <Grid item xs>
        <b>
          Rewards to claim: {rewards.amount} BHC <small>({rewards?.periods} periods)</small>
        </b>
      </Grid>
      <Grid item xs="auto">
        <Button disabled={rewards.amount == 0} important small text="Claim rewards" onClick={handleClaim} />
      </Grid>
    </Grid>
  );
}
