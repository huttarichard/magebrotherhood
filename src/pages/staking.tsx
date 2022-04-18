import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";
import { Grid, NativeSelect, NativeSelectProps, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ItemCompact } from "components/Tokens/List";
import Button from "components/ui/Button";
import Spinner from "components/ui/Spinner";
import { useWeb3ConnectWindow } from "components/ui/WalletConnectWindow";
import { useStakingContract } from "hooks/useContract";
import { FullToken, useTokens } from "hooks/useTokens";
import { useWeb3Wallet } from "hooks/useWeb3";
import { useWeb3TransactionPresenter } from "hooks/useWeb3Transaction";
import { formatBNToEtherFloatFixed } from "lib/bn";
import { Contract, contracts } from "lib/web3/contracts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import Layout from "../components/Layout/Layout";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  flex-direction: column;
  padding-top: 30px;

  .head {
    border-bottom: 1px solid #303030;
    padding: 15px;
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
`;

const AmountSelect = styled(NativeSelect)`
  min-width: 100px;
  height: 40px;
  color: white;
  margin-right: 30px;
  font-size: 1.2rem;
  border-radius: 4px;

  select {
    padding: 5px 20px;
  }
`;

const ItemsPaper = styled(Paper)`
  padding: 20px;
  border: 2px solid #ec12f9;

  h3 {
    margin-top: 0;
  }
`;

function AmountSelector({ amount, ...props }: { amount: number } & NativeSelectProps) {
  return (
    <AmountSelect
      defaultValue={0}
      inputProps={{
        name: "age",
        id: "uncontrolled-native",
      }}
      {...props}
    >
      <option key={0} selected>
        Select amount
      </option>
      {[...Array(amount).keys()].map((e) => (
        <option value={e + 1} key={e + 1}>
          {(e + 1).toString()}
        </option>
      ))}
    </AmountSelect>
  );
}

interface ItemsProps {
  account: string;
}

function UnstakedItems({ account }: ItemsProps) {
  const { makeTransaction } = useWeb3TransactionPresenter();
  const [amount, setAmount] = useState<number | null>(null);

  const collection = useTokens({
    staking: true,
    metadata: true,
    balance: true,
    address: account,
  });

  const handeStaking = (item: FullToken) => {
    makeTransaction({
      contract: Contract.Playables,
      description: {
        action: "Trasnfer tokens",
        description: `Stake ${amount} of ${item.name}`,
        value: BigNumber.from("0"),
      },
      fn: "safeTransferFrom",
      args: [account, contracts.staking.address as string, BigNumber.from(item.id), BigNumber.from(amount), []],
    });
  };

  const nodes = collection.data
    .map((item: FullToken) => {
      if (item.balance === 0) {
        return null;
      }
      return (
        <ItemCompact item={item} key={item.id}>
          <Grid container justifyContent="end" alignItems="center">
            <Grid item>
              <AmountSelector
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                amount={item.balance}
              />
            </Grid>
            <Grid item>
              <Button
                important
                disabled={amount === null}
                text="Stake"
                distorted
                borders
                onClick={() => {
                  handeStaking(item);
                }}
              />
            </Grid>
          </Grid>
        </ItemCompact>
      );
    })
    .filter((e) => e !== null);

  if (!collection.loading && nodes.length === 0) {
    return (
      <ItemsPaper>
        <Typography variant="h5">Items to be staked</Typography>
        <p>
          No items to stake. Visit <Link href="/tokens">collection page</Link> and buy NFT!
        </p>
      </ItemsPaper>
    );
  }

  return (
    <ItemsPaper>
      <h3>Items to be staked</h3>

      {collection.loading ? <Spinner /> : nodes}
    </ItemsPaper>
  );
}

function CumputedRewards() {
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

function StakedItems({ account }: ItemsProps) {
  const { makeTransaction } = useWeb3TransactionPresenter();

  const collection = useTokens({
    staking: true,
    metadata: true,
    address: account,
  });

  const handeUnstaking = (item: FullToken) => {
    console.log(item);

    makeTransaction({
      contract: Contract.Staking,
      description: {
        action: "Trasnfer tokens",
        description: `Unstake ${item.name}`,
        value: BigNumber.from("0"),
      },
      fn: "unstake",
      args: [contracts.playables.address as string, BigNumber.from(item.id)],
    });
  };

  const nodes = collection.data
    .map((item: FullToken) => {
      if (item.staking === 0) {
        return null;
      }
      return (
        <ItemCompact item={item} key={item.id}>
          <Button
            text="Unstake"
            distorted
            borders
            onClick={() => {
              handeUnstaking(item);
            }}
          />
        </ItemCompact>
      );
    })
    .filter((e) => e !== null);

  if (!collection.loading && nodes.length === 0) {
    return (
      <ItemsPaper>
        <Typography variant="h5">Currently staking</Typography>
        <p>Currently you are staking no items.</p>
      </ItemsPaper>
    );
  }

  return (
    <ItemsPaper>
      <h3>Currently staking</h3>
      <CumputedRewards />
      <br />

      {collection.loading ? <Spinner /> : nodes}
    </ItemsPaper>
  );
}

export default function Staking() {
  const web3 = useWeb3Wallet();
  const account = web3?.accounts?.[0];
  const window = useWeb3ConnectWindow();

  return (
    <Layout>
      <Wrapper>
        <div className="head">
          <Typography variant="h3">
            <FormattedMessage defaultMessage="Staking" id="staking_page_title" />
          </Typography>
          <br />
          <Typography variant="body1">
            <FormattedMessage
              defaultMessage="Is a vital and key component of our ecosystem. It allows for equal distribution of tokens, it rewards long term investors and prevents cheating in game. More about staking in out"
              id="staking_page_description"
            />
            &nbsp;
            <Link href="/paper">
              <a>
                <FormattedMessage defaultMessage="LitePaper" id="staking_page_description_link_text" />
              </a>
            </Link>
            .
          </Typography>
        </div>

        <br />

        {web3.connected && account ? (
          <>
            <UnstakedItems account={account} />
            <br />
            <StakedItems account={account} />
          </>
        ) : (
          <>
            Please connect your wallet!
            <br />
            <br />
            <Button text="Connect Wallet" important onClick={window.connect} />
          </>
        )}
      </Wrapper>
    </Layout>
  );
}
