import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, parseUnits } from "@ethersproject/units";
import { faArrowRight, faArrowUpArrowDown, faChartCandlestick } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCoingeckoPrice } from "@usedapp/coingecko";
import Layout from "components/Layout/Layout";
import Button from "components/ui/Button";
import CurrencyFieldText from "components/ui/CurrencyFieldText";
import Paper from "components/ui/Paper";
import Card from "components/ui/Paper";
import useCoinContract from "hooks/useCoinContract";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

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

enum Currency {
  ETH,
  BHC,
  USD,
}
export default function Swap() {
  const coin = useCoinContract();
  const etherPrice = useCoingeckoPrice("ethereum", "usd");

  const [mode, setMode] = useState<Mode>(Mode.EthToBhc);
  const [tax, setTax] = useState<number | null>(null);
  const [eth, setEth] = useState<number | null>(null);
  const [bhc, setBhc] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [converting, setConverting] = useState<Currency | null>();

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

  const convertToBN = (v = 0): BigNumber => {
    if (isSubmitting || !coin) {
      return BigNumber.from("0");
    }
    return parseUnits(v.toFixed(10), 18);
  };

  const ethDebounce = useDebouncedCallback((val: number) => {
    if (!val || !coin || isSubmitting) return;
    console.log("eth");

    coin
      .getEthToTokenInputPrice(convertToBN(val))
      .then((result: BigNumber) => {
        setBhc(parseFloat(formatEther(result)));
      })
      .finally(() => {
        setConverting(null);
      });
  }, 1000);

  const bhcDebounce = useDebouncedCallback((val: number) => {
    if (!val || !coin || isSubmitting) return;
    console.log("bhc");

    coin
      .getTokenToEthInputPriceWithTax(convertToBN(val))
      .then(([res, tax]: BigNumber[]) => {
        setTax(parseFloat(formatEther(tax)));
        setEth(parseFloat(formatEther(res)));
      })
      .finally(() => {
        setConverting(null);
      });
  }, 500);

  const compareNumbers = (a: number | null, b?: number | null, decs = 8): boolean => {
    const x = parseInt((a || 0) * Math.pow(10, decs) + "");
    const y = parseInt((b || 0) * Math.pow(10, decs) + "");
    return x === y;
  };

  const formElements = [
    <CurrencyFieldText
      InputProps={{
        name: "eth",
        disabled: isSubmitting || converting === Currency.BHC,
      }}
      name="eth"
      label={mode === Mode.EthToBhc ? "Sell ETH" : "Receive ETH"}
      value={eth?.toString() || ""}
      allowNegative={false}
      placeholder="0 ETH"
      autoComplete="off"
      onValueChange={(values) => {
        if (isSubmitting || !coin) {
          return;
        }
        if (!values.floatValue) {
          setEth(0);
          setBhc(0);
          return;
        }
        if (compareNumbers(eth, values.floatValue, 8)) {
          return;
        }
        setConverting(Currency.ETH);
        setEth(values.floatValue as number);
        ethDebounce(values.floatValue as number);
      }}
      helperText={"dolar value? " + etherPrice}
      key="eth"
    />,

    <span key="switch" className="switch" onClick={handleModeSwitch}>
      <span>Switch</span>
      <FontAwesomeIcon icon={faArrowUpArrowDown} />
    </span>,

    <CurrencyFieldText
      InputProps={{
        name: "bhc",
        disabled: isSubmitting || converting === Currency.ETH,
      }}
      label={mode === Mode.EthToBhc ? "Receive BHC" : "Sell BHC"}
      value={bhc?.toString() || ""}
      autoComplete="off"
      placeholder="0 BHC"
      onValueChange={(values) => {
        if (isSubmitting || !coin) {
          return;
        }
        if (!values.floatValue) {
          setEth(0);
          setBhc(0);
          return;
        }
        if (compareNumbers(bhc, values.floatValue, 2)) {
          return;
        }
        console.log("bhc change", bhc, values.floatValue);
        setConverting(Currency.BHC);
        setBhc(values.floatValue as number);
        bhcDebounce(values.floatValue as number);
      }}
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
            {/* <Grid container justifyContent="space-between">
              <Grid item>
              </Grid>
              <Grid item>
                <ToggleButtonGroup color="primary" value={buysell} exclusive onChange={(e, value) => setBuySell(value)}>
                  <ToggleButton value="buy">BUY</ToggleButton>
                  <ToggleButton value="sell">SELL</ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid> */}
          </CardHeader>

          <form onSubmit={handleSubmit}>
            {mode === Mode.EthToBhc ? formElements.map((el) => el) : formElements.reverse().map((el) => el)}
            <Button
              text="Swap"
              disabled={!coin || isSubmitting || converting !== null}
              className="btn"
              distorted
              block
              borders
              large
            />
          </form>
          <small>
            By clicking &quot;SWAP&quot; you are agreeing to <Link href="/tos">terms of conditions</Link>.
          </small>

          {/* {tax && (
            <>
              <br />
              <div>Tax: {tax}</div>
            </>
          )} */}
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
