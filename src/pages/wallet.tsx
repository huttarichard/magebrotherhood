import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { FormattedMessage } from "react-intl";

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

export default function FAQ() {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Lite Paper</title>
      </Head>

      <Layout>
        <Main>
          <div className="head">
            <Typography variant="h3">
              <FormattedMessage defaultMessage="Wallet" id="3yk8fB" />
            </Typography>
          </div>

          <br />

          <div className="body"></div>
        </Main>
      </Layout>
    </>
  );
}
