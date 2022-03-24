import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Layout from "components/Layout/Layout";
import Button from "components/ui/Button";
import Card from "components/ui/Paper";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useState } from "react";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  .download {
    font-size: 30px;
    background: #d2d2d2;
    display: inline-flex;
    width: auto;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    color: gray;
    text-decoration: none;
    font-weight: 600;

    span {
      padding-right: 10px;
      font-size: 22px;
    }
  }

  .body {
    padding: 20px;
  }
`;

const CardWrapper = styled(Card)`
  padding: 17px;
  max-width: 100%;
  margin: 0 22px;

  ${(props) => props.theme.breakpoints.down("md")} {
    margin: 0;
    padding: 20px;
    background: transparent;
    border: 0;
    box-shadow: none;
    border-top: 2px solid #ec12f9;
    border-bottom: 2px solid #ec12f9;
    border-radius: 0;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    border: 2px solid #ec12f9;
  }

  .btn {
    margin-top: 30px;
  }
`;

const CardHeader = styled.div`
  h1 {
    margin: 0 0 2rem;
    font-size: 3rem;
    text-transform: uppercase;
  }

  p {
    margin: 0;
  }
`;

interface SwapForm {
  eth: number;
}

export default function Swap() {
  const initialValues: SwapForm = { eth: 0 };
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setIsSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <Main>
          <div className="head">
            <Typography variant="h3">Affiliate</Typography>
            <br />
            <Typography variant="body1">
              Looking to make same extra cash? Hey, we might have something for you. Our first decentralized marketing
              allows to reward you for influencing and your community by discounting our services.
            </Typography>
            <br />
            <Typography variant="body1">
              Everytime someone mints with your code, you will be rewarded with brotherhood coin! Amount of reward
              varies depending on price of ethereums gas, but you can expect some nice gains! Register code below and
              start earning.
            </Typography>
          </div>

          <br />

          <CardWrapper>
            <CardHeader>
              <Typography variant="h5">Register</Typography>
            </CardHeader>

            <br />

            <Formik
              initialValues={initialValues}
              validate={async (values) => {
                const errors: { eth?: string } = {};

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                }, 100);
              }}
            >
              {() => (
                <Form onSubmit={handleSubmit}>
                  {/* onChange={(event) => setEth(Number(event.target.value))} */}
                  {/* value={eth} */}
                  <TextField fullWidth name="code" label="CODE" helperText={"For example ADAM123"} key="code" />

                  <Button text="Register Code" disabled={isSubmitting} className="btn" distorted borders large />
                </Form>
              )}
            </Formik>
          </CardWrapper>
        </Main>
      </Layout>
    </>
  );
}
