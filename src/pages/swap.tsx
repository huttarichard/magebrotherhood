import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Layout from "components/Layout/Layout";
import Button from "components/ui/Button";
import Card from "components/ui/Card";
import { Formik } from "formik";
import useWallet from "hooks/useWallet";
import dynamic from "next/dynamic";
import { useState } from "react";

const CoinPriceChart = dynamic(() => import("components/Swap/Chart"), {
  ssr: false,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const CardWrapper = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BackgroundChart = styled.div`
  /* width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1; */
`;

interface SwapForm {
  eth: number;
}

export default function Swap() {
  const wallet = useWallet();

  const initialValues: SwapForm = { eth: 0 };

  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [resultAmount, setResultAmount] = useState(0);

  const exchangeRateText = exchangeRate === null ? "" : `Exchange rate: 1ETH = ${exchangeRate}BHC`;

  return (
    <Layout>
      <BackgroundChart>
        <CoinPriceChart />
      </BackgroundChart>

      <CardWrapper>
        <p>Balance: {JSON.stringify(wallet?.data?.accounts[0].balance)}</p>
        <Formik
          initialValues={initialValues}
          validate={async (values) => {
            const errors: { eth?: string } = {};

            if (isNaN(values.eth)) {
              errors.eth = "Invalid value";
            } else if (values.eth === 0) {
              errors.eth = "Amount must be greater than 0";
            }

            if (errors.eth) {
              return errors;
            }

            // check conversion rate
            await sleep(1000);
            const exchangeRate = 2;
            setResultAmount(values.eth * exchangeRate);
            setExchangeRate(exchangeRate);

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 100);
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting, isValidating }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="eth"
                name="eth"
                label="ETH"
                value={values.eth}
                type="number"
                onChange={handleChange}
                error={touched.eth && Boolean(errors.eth)}
                helperText={touched.eth && errors.eth}
              />

              <div>
                <p>Result amount: {resultAmount}</p>
                <p>{exchangeRateText}</p>
              </div>

              <br />

              <div className="d-grid gap-2">
                <Button text="Swap" disabled={isSubmitting || isValidating} />
              </div>
            </form>
          )}
        </Formik>
      </CardWrapper>
    </Layout>
  );
}
