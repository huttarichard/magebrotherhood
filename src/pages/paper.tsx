import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import Link from "next/link";

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
`;

export default function FAQ() {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <Main>
          <div className="head">
            <Typography variant="h3">Lite Paper</Typography>
            <br />
            <Typography variant="body1">
              Here you can find documents briefly describing our ecosystem bit more in detail than visualizations on
              site. Please, feel free to visit our <Link href="/">Discord</Link> and post suggestion, they are more than
              welcomed.
            </Typography>
          </div>

          <br />

          <div></div>
        </Main>
      </Layout>
    </>
  );
}
