import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";
import { faArrowUpArrowDown } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/Typography";
import Button from "components/ui/Button";
import { CurrencyFieldDebounced } from "components/ui/CurrencyField";
import Card from "components/ui/Paper";
import { SpinnerBlock } from "components/ui/Spinner";
import { useExchangeContract } from "hooks/useContract";
import { useWeb3Remote } from "hooks/useWeb3";
import { useWeb3TransactionPresenter } from "hooks/useWeb3Transaction";
import { formatBNToEtherFloatFixed } from "lib/bn";
import Link from "next/link";
import { PropsWithChildren, useState } from "react";

const CardWrapper = styled(Card)`
  margin: 0 auto;
  padding: 17px;
  min-width: 350px;
  width: 100%;

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
    padding-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

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

export function Form() {
  const web3Remote = useWeb3Remote();
  const { loading, contract: exchange, error } = useExchangeContract(web3Remote);
  const presenter = useWeb3TransactionPresenter();

  enum Mode {
    EthToBhc,
    BhcToEth,
  }

  enum Currency {
    ETH,
    BHC,
  }

  const [mode, setMode] = useState<Mode | null>(Mode.EthToBhc);
  const [eth, setEth] = useState<BigNumber | null>(null);
  const [bhc, setBhc] = useState<BigNumber | null>(null);
  const [tax, setTax] = useState<BigNumber>(BigNumber.from(0));
  const [converting, setConverting] = useState<Currency | null>();

  const handleModeSwitch = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (mode === Mode.EthToBhc) {
      setMode(Mode.BhcToEth);
    } else {
      setMode(Mode.EthToBhc);
    }
  };

  const formElements = [
    <CurrencyFieldDebounced
      disabled={converting === Currency.BHC || !exchange}
      name="eth"
      label={mode === Mode.EthToBhc ? `Sell ETH` : `Receive ETH`}
      value={eth}
      placeholder="0 ETH"
      onValueChangeStart={() => {
        setConverting(Currency.ETH);
      }}
      onValueChange={async (x: BigNumber | null) => {
        setEth(x);
        if (!x || x.eq(0) || !exchange) {
          return;
        }
        const res = await exchange.getEthToTokenInputPrice(x);
        setBhc(res);
        setConverting(null);
      }}
      key="eth"
    />,

    <span key="switch" className="switch" onClick={handleModeSwitch}>
      <span>Switch</span>
      <FontAwesomeIcon icon={faArrowUpArrowDown} />
    </span>,

    <CurrencyFieldDebounced
      disabled={converting === Currency.ETH || !exchange}
      name="bhc"
      label={mode === Mode.EthToBhc ? `Receive BHC` : `Sell BHC`}
      value={bhc}
      placeholder="0 BHC"
      onValueChangeStart={() => {
        setConverting(Currency.BHC);
      }}
      onValueChange={async (x: BigNumber | null) => {
        setBhc(x);
        if (!x || x.eq(0) || !exchange) {
          return;
        }
        const [res, tax] = await exchange.getTokenToEthInputPriceWithTax(x);
        setEth(res);
        setTax(tax);
        setConverting(null);
      }}
      key="bhc"
    />,
  ];

  const ethToTokenSwap = () => {
    if (!bhc || !eth) return;
    const minTokens = bhc.mul(BigNumber.from(9999)).div(BigNumber.from(10000));
    presenter.ethToTokenSwap(minTokens, eth, bhc);
  };

  const tokenToETHSwap = () => {
    if (!bhc || !eth) return;
    console.info("Tax:", formatBNToEtherFloatFixed(tax));
    const minEth = eth.mul(BigNumber.from(9999)).div(BigNumber.from(10000));
    presenter.tokenToETHSwap(minEth, eth, bhc);
  };

  if (loading) {
    return <SpinnerBlock />;
  }

  if (error) {
    throw error;
  }

  return (
    <form>
      {mode === Mode.EthToBhc ? formElements.map((el) => el) : formElements.reverse().map((el) => el)}

      {mode === Mode.BhcToEth && <small>Selling tax 5% will be applied.</small>}
      <Button
        important
        text="Swap"
        onClick={() => {
          mode === Mode.EthToBhc ? ethToTokenSwap() : tokenToETHSwap();
        }}
        disabled={!exchange || converting !== null || presenter.open}
        className="btn"
        distorted
        block
        borders
        large
      />
    </form>
  );
}

export default function SwapForm({ children }: PropsWithChildren<unknown>) {
  return (
    <CardWrapper>
      <CardHeader>
        <Typography variant="h1">Swap</Typography>
      </CardHeader>

      <Form />

      {children}

      <small>
        By clicking &quot;SWAP&quot; you are agreeing to
        <Link href="/tos">
          <a>terms of conditions.</a>
        </Link>
      </small>
    </CardWrapper>
  );
}
