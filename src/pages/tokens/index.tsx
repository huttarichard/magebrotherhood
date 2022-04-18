import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Layout from "components/Layout/Layout";
import { ItemExpanded } from "components/Tokens/List";
import Countdown from "components/ui/CountDown";
import Paper from "components/ui/Paper";
import Spinner from "components/ui/Spinner";
import { FullToken, useTokens } from "hooks/useTokens";
import Head from "next/head";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  flex-direction: column;
  padding-top: 30px;

  .head {
    border-bottom: 1px solid #303030;
    padding: 15px;
    padding-bottom: 30px;
  }
`;

const Card = styled(Paper)`
  margin-bottom: 30px;
`;

interface Item {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

function Item({ item }: { item: FullToken }) {
  const router = useRouter();

  return (
    <Card>
      <ItemExpanded token={item}>
        <Countdown countDownDate={item.launchedAt} />
      </ItemExpanded>
    </Card>
  );
}

export default function TokensIndex() {
  const tokens = useTokens({
    metadata: true,
  });

  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <Wrapper>
          <div className="head">
            <Typography variant="h3">MageBrotherhood Tokens</Typography>
            <br />
            <Typography variant="body1">Here...</Typography>
          </div>
          <br />

          {tokens.loading ? <Spinner /> : tokens.data.map((item) => <Item key={item.id} item={item}></Item>)}

          <br />
        </Wrapper>
      </Layout>
    </>
  );
}
