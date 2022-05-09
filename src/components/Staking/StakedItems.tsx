import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CardSmall } from "components/Tokens/CardSmall";
import Button from "components/ui/Button";
import { SpinnerBlock } from "components/ui/Spinner";
import { FullToken, useTokens } from "hooks/useTokens";
import { useWeb3TransactionPresenter } from "hooks/useWeb3Transaction";
import { Contract, contracts } from "lib/web3/contracts";

import CumputedRewards from "./CumputedRewards";

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

export default function StakedItems({ account }: Props) {
  const { makeTransaction } = useWeb3TransactionPresenter();

  const collection = useTokens({
    staking: true,
    metadata: true,
    address: account,
  });

  const handeUnstaking = (item: FullToken) => {
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
        <CardSmall token={item} key={item.id} description padding={2} size={120}>
          <Button
            text="Unstake"
            distorted
            borders
            onClick={() => {
              handeUnstaking(item);
            }}
          />
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

      {nodes}
    </ItemsPaper>
  );
}
