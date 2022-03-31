import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import BrotherhoodCoinLogo from "components/ui/BrotherhoodCoinLogo";
import Button from "components/ui/Button";
import CurrencyFieldText from "components/ui/CurrencyFieldText";
// import CurrencyFieldText from "components/ui/";
import EthereumLogo from "components/ui/EthereumLogo";
import MustConnect from "components/ui/MustConnectWallet";
import Paper from "components/ui/Paper";
import useCoinContract from "hooks/useCoinContract";
import useWeb3 from "hooks/useWeb3";
import Head from "next/head";
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

export default function FAQ() {
  const eths = useWeb3();
  const [filter, setFilter] = useState<Filter>(Filter.Assets);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { contract, ready, error } = useCoinContract(eths);

  useEffect(() => {
    if (!ready) return;
  }, [ready]);

  const intl = useIntl();

  const disconnect = intl.formatMessage({
    defaultMessage: "Disconnect",
    id: "qj1uhz",
  });

  const assets = intl.formatMessage({
    defaultMessage: "Assets",
    id: "d1uESJ",
  });

  const transfer = intl.formatMessage({
    defaultMessage: "Transfer",
    id: "DtYelJ",
  });

  return (
    <>
      <Head>
        <title>Mage Brotherhood - Lite Paper</title>
      </Head>

      <Layout>
        <Main>
          <MustConnect>
            <div className="head">
              <Typography variant="h3">
                <FormattedMessage defaultMessage="Wallet" id="3yk8fB" />
              </Typography>
              <Typography variant="body2">{eths.account}</Typography>
            </div>

            <br />

            <div className="body">
              <Assets magical>
                <Tabs value={filter} onChange={(event, newValue) => setFilter(newValue)}>
                  <Tab label={assets} />
                  <Tab label={transfer} />
                </Tabs>

                <br />

                {filter === Filter.Assets && (
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
                          value={0.1}
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
                          value={0.1}
                          maximumFractionDigits={6}
                          minimumFractionDigits={2}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}

                {filter === Filter.Transfer && (
                  <>
                    <CurrencyFieldText
                      InputProps={{
                        name: "eth",
                        disabled: isSubmitting,
                      }}
                      name="eth"
                      label="Amount BHC"
                      allowNegative={false}
                      placeholder="0 BHC"
                      autoComplete="off"
                      key="eth"
                      value="0"
                    />

                    <br />
                    <br />

                    <TextField placeholder="0x00000000......" value="" label="Address" fullWidth />

                    <br />
                    <br />

                    <Button text="Make transaction" distorted borders large />
                  </>
                )}
              </Assets>

              <Button onClick={eths.deactivate} text={disconnect} distorted borders block large />
            </div>
          </MustConnect>
        </Main>
      </Layout>
    </>
  );
}
