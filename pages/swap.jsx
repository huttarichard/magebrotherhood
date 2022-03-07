import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Formik } from "formik";
import { Container, Row, Form, Button } from "react-bootstrap";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Swap() {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [resultAmount, setResultAmount] = useState(0);

  const exchangeRateText = exchangeRate === null ? "" : `Exchange rate: 1ETH = ${exchangeRate}COIN`;

  return (
    <Layout>
      <Container fluid>
        <Row>
          <h1>Swap</h1>
        </Row>
        <Row>
          <Formik
            initialValues={{ eth: 0 }}
            validate={async (values) => {
              const errors = {};

              if (values.eth === "") {
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
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValidating }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="eth">
                  <Form.Label>ETH</Form.Label>
                  <Form.Control
                    nane="eth"
                    type="number"
                    step={0.001}
                    value={values.eth}
                    onChange={handleChange}
                    isInvalid={!!errors.eth}
                  />
                  <Form.Control.Feedback type="invalid">{errors.eth}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Coin</Form.Label>
                  <Form.Control type="text" placeholder="0.00" value={resultAmount} disabled />
                  <Form.Text muted>{exchangeRateText}</Form.Text>
                </Form.Group>
                <Button type="submit" variant="primary" disabled={isSubmitting || isValidating}>
                  Swap
                </Button>
              </Form>
            )}
          </Formik>
        </Row>
      </Container>
    </Layout>
  );
}
