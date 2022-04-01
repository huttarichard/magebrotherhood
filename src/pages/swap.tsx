import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";
import { faArrowRight, faArrowUpArrowDown, faChartCandlestick } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCoingeckoPrice } from "@usedapp/coingecko";
import Layout from "components/Layout/Layout";
import Button from "components/ui/Button";
import { CurrencyField, CurrencyFieldRef } from "components/ui/CurrencyField";
import Paper from "components/ui/Paper";
import Card from "components/ui/Paper";
import Spinner from "components/ui/Spinner";
import useCoinContract from "hooks/useCoinContract";
import useWeb3 from "hooks/useWeb3";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

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
  min-width: 350px;

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
  const ethers = useWeb3();
  const { contract: coin, error, ready } = useCoinContract(ethers);
  const etherPrice = useCoingeckoPrice("ethereum", "usd");
  const intl = useIntl();
  const router = useRouter();
  // const [tax, setTax] = useState<number | null>(null);

  const [mode, setMode] = useState<Mode | null>(Mode.EthToBhc);
  const [eth, setEth] = useState<BigNumber | null>(null);
  const [bhc, setBhc] = useState<BigNumber | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [converting, setConverting] = useState<Currency | null>();

  // refs
  const bhcRef = useRef<CurrencyFieldRef | null>(null);
  const ethRef = useRef<CurrencyFieldRef | null>(null);

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

  // i18n
  const labelSell = intl.formatMessage({
    defaultMessage: "Sell",
    id: "swap_page_label_sell",
  });

  const labelReceive = intl.formatMessage({
    defaultMessage: "Receive",
    id: "swap_page_label_receive",
  });

  const swapButtonText = intl.formatMessage({
    defaultMessage: "Swap",
    id: "swap_page_swap_button_text",
  });

  const formElements = [
    <CurrencyField
      disabled={isSubmitting || converting === Currency.BHC}
      name="eth"
      label={mode === Mode.EthToBhc ? `${labelSell} ETH` : `${labelReceive} ETH`}
      value={eth}
      ref={ethRef}
      placeholder="0 ETH"
      onBNChangeStart={() => {
        setConverting(Currency.ETH);
      }}
      onBNChange={async (x: BigNumber | null) => {
        setEth(x);

        if (!x || !coin) {
          return;
        }

        const res = await coin.getEthToTokenInputPrice(x);
        bhcRef?.current?.setValueSilently(res);
        setConverting(null);
      }}
      helperText={etherPrice ? `${etherPrice}$` : ""}
      key="eth"
    />,

    <span key="switch" className="switch" onClick={handleModeSwitch}>
      <span>
        <FormattedMessage defaultMessage="Switch" id="swap_page_switch_button_text" />
      </span>
      <FontAwesomeIcon icon={faArrowUpArrowDown} />
    </span>,

    <CurrencyField
      disabled={isSubmitting || converting === Currency.ETH}
      name="bhc"
      label={mode === Mode.EthToBhc ? `${labelReceive} BHC` : `${labelSell} BHC`}
      value={bhc}
      ref={bhcRef}
      placeholder="0 BHC"
      onBNChangeStart={() => {
        setConverting(Currency.BHC);
      }}
      onBNChange={async (x: BigNumber | null) => {
        setBhc(x);

        if (!x || !coin) {
          return;
        }

        const [res, tax] = await coin.getTokenToEthInputPriceWithTax(x);
        ethRef?.current?.setValueSilently(res);
        setConverting(null);
      }}
      key="bhc"
    />,
  ];

  const form = (
    <>
      <form onSubmit={handleSubmit}>
        {mode === Mode.EthToBhc ? formElements.map((el) => el) : formElements.reverse().map((el) => el)}
        <Button
          text={swapButtonText}
          disabled={!coin || isSubmitting || converting !== null}
          className="btn"
          distorted
          block
          borders
          large
        />
      </form>

      <small>
        <FormattedMessage
          defaultMessage='By clicking "SWAP" you are agreeing to'
          id="swap_page_terms_acceptance_text"
        />
        <Link href="/tos">
          <a>
            <FormattedMessage defaultMessage="terms of conditions" id="swap_page_terms_acceptance_link_text" />
          </a>
        </Link>
        .
      </small>

      {/* {tax && (
            <>
              <br />
              <div>Tax: {tax}</div>
            </>)} */}
    </>
  );

  return (
    <Layout>
      <Main>
        <CardWrapper>
          <CardHeader>
            <h1>
              <FormattedMessage defaultMessage="Swap" id="swap_page_title" />
            </h1>
          </CardHeader>

          {ready && ethers.resolved ? form : <Spinner />}

          {error && <p>{error.message}</p>}
        </CardWrapper>

        <Tranding onClick={() => router.push("/price")}>
          <FontAwesomeIcon icon={faChartCandlestick} />

          <div className="text">
            <FormattedMessage defaultMessage="Trading view chart" id="swap_page_chart_button_text" />
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </Tranding>
      </Main>
    </Layout>
  );
}
