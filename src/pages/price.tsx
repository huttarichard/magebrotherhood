import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Layout from "components/Layout/Layout";
import Button from "components/ui/Button";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const CoinPriceChart = dynamic(() => import("components/Swap/Chart"), {
  ssr: false,
});

const Title = styled.div`
  padding: 10px;
  pointer-events: none;
  width: auto;
  position: absolute;
  top: 60px;
  left: 0;
  color: white;
  z-index: 9;

  ${(props) => props.theme.breakpoints.up("lg")} {
    top: 0;
  }

  /* width: 100%;
  height: 100%;
  right: 0;
  bottom: 0;
  z-index: -1; */

  h4 {
    padding: 0;
    margin: 0;

    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
    padding-bottom: 10px;
  }

  .btn {
    pointer-events: all;
  }
`;

export default function Swap() {
  const router = useRouter();
  return (
    <Layout>
      <Title>
        <Typography variant="h4">Brotherhood Coin - BHC/USD</Typography>
        <p>1 DAY CANDLE CHART</p>
        <Button className="btn" small text="Swap coins" onClick={() => router.push("/swap")} />
      </Title>
      <CoinPriceChart />
    </Layout>
  );
}
