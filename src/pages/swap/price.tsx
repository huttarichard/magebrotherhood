import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Layout from "components/Layout/Layout";
import Button from "components/ui/Button";
import { useExchangeContract } from "hooks/useContract";
import { useWeb3Remote } from "hooks/useWeb3";
import { Candle, FILTER_ALL, getCandles } from "lib/web3/exchange";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

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

const Chart = styled.div`
  height: calc(100vh - 60px);
  max-height: 100vh;
  overflow: hidden;

  ${(props) => props.theme.breakpoints.up("lg")} {
    height: 100%;
  }
`;

export async function getServerSideProps() {
  const { getCandlesWithInfura } = await import("lib/web3/exchange");

  const data = await getCandlesWithInfura();
  return { props: { data } };
}

interface Props {
  data: Candle[];
}

export default function Swap({ data }: Props) {
  console.log(data);
  const router = useRouter();
  const [priceData, setPriceData] = useState<Candle[]>(data);
  const web3 = useWeb3Remote();
  const { contract, connected, error } = useExchangeContract(web3);

  useEffect(() => {
    if (!contract) return;
    contract.on(FILTER_ALL(contract), async () => {
      console.log("receive event");
      const data = await getCandles(contract);
      setPriceData(data);
    });
  }, [connected]);

  return (
    <Layout>
      <Title>
        <Typography variant="h4">Brotherhood Coin - BHC/USD</Typography>
        <p>1 DAY CANDLE CHART</p>
        <Button className="btn" small text="Swap coins" onClick={() => router.push("/swap")} />
      </Title>
      <Chart>
        {error && <div>{error.message}</div>}
        <CoinPriceChart data={priceData} />
      </Chart>
    </Layout>
  );
}
