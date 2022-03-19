import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Layout from "components/Layout/Layout";
import Button from "components/ui/Button";
import Card from "components/ui/Card";
import useWallet from "hooks/useWallet";
import dynamic from "next/dynamic";
import { useState } from "react";

const CoinPriceChart = dynamic(() => import("components/Swap/Chart"), {
  ssr: false,
});

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

const CardHeader = styled.div`
  h1 {
    margin: 0 0 2rem;
    font-family: "Bebas Neue", sans-serif;
    font-weight: 400;
    font-size: 3rem;
    text-transform: uppercase;
  }

  p {
    margin: 0;
  }
`;

enum Mode {
  EthToBhc,
  BhcToEth,
}

export default function Swap() {
  const wallet = useWallet();

  const [mode, setMode] = useState<Mode>(Mode.EthToBhc);
  const [eth, setEth] = useState<number>(0);
  const [bhc, setBhc] = useState<number>(0);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const validateEth = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsValidating(true);

    const value = Number(event.target.value);
    setEth(value);

    await sleep(500);

    setBhc(value * 2);

    setIsValidating(false);
  };

  const validateBhc = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsValidating(true);

    const value = Number(event.target.value);
    setBhc(value);

    await sleep(500);

    setEth(value / 2);

    setIsValidating(false);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setIsSubmitting(false);
  };

  const handleModeSwitch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (mode === Mode.EthToBhc) {
      setMode(Mode.BhcToEth);
    } else {
      setMode(Mode.EthToBhc);
    }
  };

  const formElements = [
    <TextField
      fullWidth
      name="eth"
      label="ETH"
      value={eth}
      type="number"
      onChange={validateEth}
      helperText={"dolar value?"}
      key="eth"
    />,
    <button key="switch" onClick={handleModeSwitch}>
      switch
    </button>,
    <TextField
      fullWidth
      name="bhc"
      label="BHC"
      value={bhc}
      type="number"
      onChange={validateBhc}
      helperText={"dolar value?"}
      key="bhc"
    />,
  ];

  return (
    <Layout>
      <BackgroundChart>
        <CoinPriceChart />
      </BackgroundChart>

      <CardWrapper>
        <CardHeader>
          <h1>Swap</h1>
          {wallet.data && <p>Balance: {JSON.stringify(wallet.data.accounts[0].balance)}</p>}
        </CardHeader>

        <form onSubmit={handleSubmit}>
          {mode === Mode.EthToBhc ? formElements.map((el) => el) : formElements.reverse().map((el) => el)}
          <Button text="Swap" disabled={isValidating || isSubmitting} distorted />
        </form>
      </CardWrapper>
    </Layout>
  );
}
