import styled from "@emotion/styled";
import { faArrowRight, faArrowUpArrowDown, faChartCandlestick } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "@mui/material/TextField";
import Layout from "components/Layout/Layout";
import Button from "components/ui/Button";
import Paper from "components/ui/Paper";
import Card from "components/ui/Paper";
import useWallet from "hooks/useWallet";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  padding-top: 30px;

  ${(props) => props.theme.breakpoints.up("md")} {
    margin: 0 auto;
    padding-top: 0px;
    max-width: 400px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const CardWrapper = styled(Card)`
  margin: 0 auto;
  padding: 17px;

  ${(props) => props.theme.breakpoints.down("md")} {
    margin: 0;
    padding: 0;
    background: transparent;
    border: 0;
    box-shadow: none;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    border: 2px solid #ec12f9;
  }

  .btn {
    margin-top: 30px;
  }

  small {
    font-size: 15px;
    text-align: center;
    display: flex;
    justify-content: center;
    padding-top: 10px;

    a {
      padding-left: 5px;
      color: #ec12f9;
    }
  }

  .switch {
    text-align: right;
    display: inherit;
    padding: 8px;
    padding-bottom: 20px;
    font-size: 18px;
    cursor: pointer;

    span {
      margin-right: 6px;
    }
  }
`;

const Tranding = styled(Paper)`
  margin: 0 auto;
  background: linear-gradient(155deg, #008eb5, #9200a5 43%, #ec12f9);
  border: 0;
  padding: 17px;
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: linear-gradient(180deg, #5ddcff, #3c67e3 43%, #4e00c2);
    filter: blur(60px);
    position: absolute;
    z-index: -1;
    top: 41%;
    left: 0%;
    background-size: 200% 200%;
  }

  svg {
    font-size: 39px;
  }

  .text svg {
    font-size: 21px;
  }

  ${(props) => props.theme.breakpoints.down("md")} {
    margin: 20px;
    width: calc(100% - 52px);
    margin-top: 50px;
  }
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Swap() {
  const wallet = useWallet();

  const [mode, setMode] = useState<Mode>(Mode.EthToBhc);
  const [eth, setEth] = useState<number>(0);
  const [bhc, setBhc] = useState<number>(0);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      (async () => {
        setIsValidating(true);

        await sleep(200);

        setBhc(eth * 2);

        setIsValidating(false);
      })();
    }, 200);
    return () => clearTimeout(timeOutId);
  }, [eth]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      (async () => {
        setIsValidating(true);

        await sleep(200);

        setEth(bhc / 2);

        setIsValidating(false);
      })();
    }, 200);
    return () => clearTimeout(timeOutId);
  }, [bhc]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setIsSubmitting(false);
  };

  const handleModeSwitch = (e: React.MouseEvent<HTMLDivElement>) => {
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
      onChange={(event) => setEth(Number(event.target.value))}
      helperText={"dolar value?"}
      key="eth"
    />,

    <span key="switch" className="switch" onClick={handleModeSwitch}>
      <span>Switch</span>
      <FontAwesomeIcon icon={faArrowUpArrowDown} />
    </span>,

    <TextField
      fullWidth
      name="bhc"
      label="BHC"
      value={bhc}
      type="number"
      onChange={(event) => setBhc(Number(event.target.value))}
      helperText={"dolar value?"}
      key="bhc"
    />,
  ];

  const router = useRouter();

  return (
    <Layout>
      <Main>
        <CardWrapper>
          <CardHeader>
            <h1>Swap</h1>
            {wallet.data && <p>Balance: {JSON.stringify(wallet.data.accounts[0].balance)}</p>}
          </CardHeader>

          <form onSubmit={handleSubmit}>
            {mode === Mode.EthToBhc ? formElements.map((el) => el) : formElements.reverse().map((el) => el)}
            <Button text="Swap" disabled={isValidating || isSubmitting} className="btn" distorted block borders large />
          </form>
          <small>
            By clicking &quot;SWAP&quot; you are agreeing to <Link href="/tos">terms of conditions</Link>.
          </small>
        </CardWrapper>

        <Tranding onClick={() => router.push("/price")}>
          <FontAwesomeIcon icon={faChartCandlestick} />

          <div className="text">
            Trading view chart <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </Tranding>
      </Main>
    </Layout>
  );
}
