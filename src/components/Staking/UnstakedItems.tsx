import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";
import { Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CardSmall } from "components/Tokens/CardSmall";
import Button from "components/ui/Button";
import { SpinnerBlock } from "components/ui/Spinner";
import { FullToken, useTokens } from "hooks/useTokens";
import { useWeb3TransactionPresenter } from "hooks/useWeb3Transaction";
import { Contract, contracts } from "lib/web3/contracts";
import Link from "next/link";
import { useState } from "react";

import AmountSelector from "./AmountSelector";

const ItemsPaper = styled(Paper)`
  padding: 20px;
  border: 2px solid #ec12f9;

  h3 {
    margin-top: 0;
  }
`;

export interface Props {
  account: string;
}

export default function UnstakedItems({ account }: Props) {
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

  if (collection.error) {
    throw collection.error;
  }

  const nodes = collection.data
    .map((item: FullToken) => {
      if (item.balance === 0) {
        return null;
      }
      return (
        <CardSmall token={item} key={item.id} description padding={2} size={120}>
          <Grid container justifyContent="end" alignItems="center">
            <Grid item>
              <AmountSelector onChange={(e) => setAmount(parseInt(e.target.value))} amount={item.balance} />
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
        </CardSmall>
      );
    })
    .filter((e) => e !== null);

  if (collection.loading) {
    return (
      <ItemsPaper>
        <SpinnerBlock />
      </ItemsPaper>
    );
  }

  if (nodes.length === 0) {
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
      {nodes}
    </ItemsPaper>
  );
}
