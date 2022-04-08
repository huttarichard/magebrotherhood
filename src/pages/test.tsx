import { BigNumber } from "@ethersproject/bignumber";
import Button from "components/ui/Button";
import { useWeb3TransactionPresenter } from "components/ui/TransactionPresenter";
import { Contract } from "lib/contracts";
import Head from "next/head";

import Layout from "../components/Layout/Layout";

export default function Test() {
  const { makeTransaction } = useWeb3TransactionPresenter();

  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <Button
          text="Make transactions"
          onClick={(e) => {
            makeTransaction<Contract.Coin, "ethToTokenSwap">({
              description: {
                action: "Swap",
                description: "Swapping ETH for BHC",
                value: BigNumber.from("100000000000000000"),
              },
              fn: "ethToTokenSwap",
              args: [
                {
                  value: BigNumber.from("100000000000000000"),
                },
              ],
              contract: Contract.Coin,
            });
          }}
        />
      </Layout>
    </>
  );
}
