import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ConnectWallet from "components/Layout/ConnectWallet";
import BrotherhoodCoinLogo from "components/ui/BrotherhoodCoinLogo";
import Button from "components/ui/Button";
import { CurrencyField } from "components/ui/CurrencyField";
import EthereumLogo from "components/ui/EthereumLogo";
import Paper from "components/ui/Paper";
import Spinner from "components/ui/Spinner";
import { useFormik } from "formik";
import { useCoinContract } from "hooks/useContract";
import { useWeb3Wallet } from "hooks/useWeb3";
import { useWeb3TransactionPresenter } from "hooks/useWeb3Transaction";
import { formatBNToEtherFloatFixed } from "lib/bn";
import { Contract } from "lib/web3/contracts";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";

import Layout from "../components/Layout/Layout";

const Main = styled.div`
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

const Assets = styled(Paper)`
  padding: 20px;
  margin-bottom: 40px;
`;

const Ethereum = styled(EthereumLogo)`
  width: 30px;
  height: 50px;
  display: inline;
`;

enum Filter {
  Assets,
  Transfer,
}

export function YourAssets() {
  const web3 = useWeb3Wallet();
  const { connected, contract: coin } = useCoinContract(web3);

  const account = web3?.accounts?.[0];
  const [bhc, setBHC] = useState<BigNumber>(BigNumber.from(0));
  const [eth, setETH] = useState<BigNumber>(BigNumber.from(0));

  useEffect(() => {
    if (!coin || !account) return;

    Promise.all([coin.balanceOf(account), web3.provider?.getBalance(account)]).then(([b, e]) => {
      setBHC(b as BigNumber);
      setETH(e as BigNumber);
    });
  }, [coin]);

  if (!connected) {
    return <Spinner />;
  }

  if (!account) {
    return <>No Account Connected.</>;
  }

  // web3.accounts;

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs container alignItems="center">
          <Grid item sx={{ minWidth: "50px" }}>
            <BrotherhoodCoinLogo width={50} height={50} color="#AE55A0" />
          </Grid>
          <Grid item>
            <Typography sx={{ padding: 1.5 }}>Brotherhood Coin</Typography>
          </Grid>
        </Grid>

        <Grid item xs="auto">
          <FormattedNumber
            style="currency"
            currency="BHC"
            currencyDisplay="narrowSymbol"
            unitDisplay="narrow"
            value={formatBNToEtherFloatFixed(bhc)}
            maximumFractionDigits={6}
            minimumFractionDigits={2}
          />
        </Grid>
      </Grid>

      <hr />

      <Grid container alignItems="center">
        <Grid item xs container alignItems="center">
          <Grid item sx={{ minWidth: "50px" }}>
            <Ethereum width={70} height={70} lightone="#ccc" color="white" />
          </Grid>
          <Grid item>
            <Typography sx={{ padding: 1.5 }}>Ethereum</Typography>
          </Grid>
        </Grid>

        <Grid item xs="auto">
          <FormattedNumber
            style="currency"
            currency="ETH"
            currencyDisplay="narrowSymbol"
            unitDisplay="narrow"
            value={formatBNToEtherFloatFixed(eth)}
            maximumFractionDigits={6}
            minimumFractionDigits={2}
          />
        </Grid>
      </Grid>
    </>
  );
}

export function Transfer() {
  const { connected } = useWeb3Wallet();
  const { makeTransaction } = useWeb3TransactionPresenter();

  interface Values {
    amount: BigNumber;
    address: string;
  }

  const formik = useFormik({
    initialValues: {
      amount: BigNumber.from(0),
      address: "",
    },
    onSubmit: (values: Values) => {
      makeTransaction<Contract.Coin, "transfer">({
        contract: Contract.Coin,
        fn: "transfer",
        description: {
          action: "Transfer",
          description: "Transfer your bortherhood coins to another address",
          value: BigNumber.from(0),
        },
        args: ["", BigNumber.from(0)],
      });
    },
  });

  if (!connected) {
    return <>Not Connected to Wallet</>;
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <CurrencyField
        InputProps={{
          name: "eth",
          disabled: false,
        }}
        name="eth"
        label="Amount BHC"
        placeholder="0 BHC"
        autoComplete="off"
        key="eth"
        value={formik.values.amount}
        onBNChange={(value) => {
          formik.setFieldValue("amount", value);
        }}
      />

      <br />
      <br />

      <TextField
        placeholder="0x00000000......"
        value={formik.values.address}
        label="Address"
        fullWidth
        name="address"
        onChange={formik.handleChange}
      />

      <br />
      <br />

      <Button text="Make transaction" distorted borders type="submit" large />
    </form>
  );
}

const Info = styled(Paper)`
  padding: 1rem;

  p {
    margin: 0;
  }
`;

export default function Wallet() {
  const { activating, connected, error, accounts } = useWeb3Wallet();
  const [filter, setFilter] = useState<Filter>(Filter.Assets);
  const [isSubmitting] = useState<boolean>(false);

  // const { resolved, contract, error } = useCoinContract();

  const intl = useIntl();

  // const disconnect = intl.formatMessage({
  //   defaultMessage: "Disconnect Wallet",
  //   id: "mVjtAF",
  // });

  const assets = intl.formatMessage({
    defaultMessage: "Assets",
    id: "d1uESJ",
  });

  const transfer = intl.formatMessage({
    defaultMessage: "Transfer",
    id: "DtYelJ",
  });

  let body = (
    <>
      <Assets magical>
        <Tabs value={filter} onChange={(event, newValue) => setFilter(newValue)}>
          <Tab label={assets} />
          <Tab label={transfer} />
        </Tabs>

        <br />

        {filter === Filter.Assets && <YourAssets />}
        {filter === Filter.Transfer && <Transfer />}
      </Assets>

      {/* onClick={eths.deactivate} */}
      {/* <Button text={disconnect} distorted borders large /> */}
    </>
  );

  if (activating) {
    body = (
      <Info>
        <Spinner />
      </Info>
    );
  }

  if (error) {
    body = (
      <Info>
        <p>Error: {error.message || "Something went wrong."}</p>
      </Info>
    );
  }

  if (!connected) {
    body = (
      <Info>
        <p>Please connect your wallet to see assets you own.</p>
        <br />
        <ConnectWallet style={{ maxWidth: 300 }} />
      </Info>
    );
  }

  return (
    <>
      <NextSeo
        title="MageBrotherhood - Wallet"
        description="Transfer assets or send your coins. Connect your wallet and get started."
      />

      <Layout>
        <Main>
          <div className="head">
            <Typography variant="h3">
              <FormattedMessage defaultMessage="Your Wallet" id="+KnohG" />
            </Typography>
            <Typography variant="body2">{accounts?.length ? accounts[0] : ""}</Typography>
          </div>

          <div className="body">{body}</div>
        </Main>
      </Layout>
    </>
  );
}
