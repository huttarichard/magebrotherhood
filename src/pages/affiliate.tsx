import styled from "@emotion/styled";
import Layout from "components/Layout/Layout";
import Card from "components/ui/Paper";
import { Formik } from "formik";
import { useState } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const CardWrapper = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
`;

interface SwapForm {
  eth: number;
}

export default function Swap() {
  const initialValues: SwapForm = { eth: 0 };

  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [resultAmount, setResultAmount] = useState(0);

  const exchangeRateText = exchangeRate === null ? "" : `Exchange rate: 1ETH = ${exchangeRate}COIN`;

  return (
    <Layout>
      <CardWrapper>
        <Formik
          initialValues={initialValues}
          validate={async (values) => {
            const errors: { eth?: string } = {};

            if (values.eth === 0) {
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
          {({ values, errors, handleChange, handleSubmit, isSubmitting, isValidating }) =>
            // <Form onSubmit={handleSubmit}>
            //   <Form.Group controlId="eth">
            //     <Form.Label>ETH</Form.Label>
            //     <Form.Control
            //       name="eth"
            //       type="number"
            //       step={0.001}
            //       value={values.eth}
            //       onChange={handleChange}
            //       isInvalid={!!errors.eth}
            //     />
            //     <Form.Control.Feedback type="invalid">{errors.eth}</Form.Control.Feedback>
            //   </Form.Group>

            //   <Form.Group>
            //     <Form.Label>Coin</Form.Label>
            //     <Form.Control type="text" placeholder="0.00" value={resultAmount} disabled />
            //     <Form.Text muted>{exchangeRateText}</Form.Text>
            //   </Form.Group>

            //   <br />

            //   <div className="d-grid gap-2">
            //     <Button size="lg" type="submit" variant="primary" disabled={isSubmitting || isValidating}>
            //       Swap
            //     </Button>
            //   </div>
            // </Form>
            null
          }
        </Formik>
      </CardWrapper>
    </Layout>
  );
}
