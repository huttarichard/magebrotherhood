import styled from "@emotion/styled";
import { Input, Label } from "@rebass/forms";
import { useWallets } from "@web3-onboard/react";
import Layout from "components/Layout/Layout";
import Card from "components/ui/Card";
import { Formik } from "formik";
import { useState } from "react";

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

interface SwapForm {
  eth: number;
}

export default function Swap() {
  const connectedWallets = useWallets();
  const wallet = connectedWallets[0];

  const initialValues: SwapForm = { eth: 0 };

  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [resultAmount, setResultAmount] = useState(0);

  const exchangeRateText = exchangeRate === null ? "" : `Exchange rate: 1ETH = ${exchangeRate}BHC`;

  return (
    <Layout>
      <CardWrapper>
        <p>Balance: {JSON.stringify(wallet?.accounts[0].balance)}</p>
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
          {({ values, errors, handleChange, handleSubmit, isSubmitting, isValidating }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="eth">ETH</Label>
                <Input name="eth" type="number" step={0.001} value={values.eth} onChange={handleChange} />
                {errors.eth && <span>{errors.eth}</span>}
              </div>

              <div>
                <Label>Coin</Label>
                <Input type="text" placeholder="0.00" value={resultAmount} disabled />
                <span>{exchangeRateText}</span>
              </div>

              <br />

              <div className="d-grid gap-2">
                <button type="submit" disabled={isSubmitting || isValidating}>
                  Swap
                </button>
              </div>
            </form>
          )}
        </Formik>
      </CardWrapper>
    </Layout>
  );
}
