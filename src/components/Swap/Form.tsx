import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";
import { faArrowUpArrowDown } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/Typography";
import Button from "components/ui/Button";
import { CurrencyField, CurrencyFieldRef } from "components/ui/CurrencyField";
import Card from "components/ui/Paper";
import Spinner from "components/ui/Spinner";
import { useWeb3TransactionPresenter } from "components/ui/TransactionPresenter";
import { useExchangeContract } from "hooks/useContract";
import { useWeb3Remote } from "hooks/useWeb3";
import { Contract } from "lib/web3";
import { formatBNToEtherFloatFixed } from "lib/web3/currency";
import Link from "next/link";
import { PropsWithChildren, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

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

enum Mode {
  EthToBhc,
  BhcToEth,
}

enum Currency {
  ETH,
  BHC,
}

interface Transaction {
  buy: Currency;
  buyAmount: BigNumber;
  sell: Currency;
  sellAmount: BigNumber;
  sellTax: BigNumber;
}

interface Props {
  onTransactionSubmit: (t: Transaction) => void | Promise<void>;
}

export default function SwapForm({ children, onTransactionSubmit }: PropsWithChildren<Props>) {
  const intl = useIntl();
  const web3Remote = useWeb3Remote();
  const { connected, contract: exchange, error } = useExchangeContract(web3Remote);
  const presenter = useWeb3TransactionPresenter();

  const [mode, setMode] = useState<Mode | null>(Mode.EthToBhc);
  const [eth, setEth] = useState<BigNumber | null>(null);
  const [bhc, setBhc] = useState<BigNumber | null>(null);
  const [tax, setTax] = useState<BigNumber>(BigNumber.from(0));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [converting, setConverting] = useState<Currency | null>();

  // refs
  const bhcRef = useRef<CurrencyFieldRef | null>(null);
  const ethRef = useRef<CurrencyFieldRef | null>(null);

  const handleSubmit = (t: Transaction) => {
    setIsSubmitting(true);
    const promise = onTransactionSubmit(t);

    if (promise instanceof Promise) {
      promise.finally(() => setIsSubmitting(false));
    } else {
      setIsSubmitting(false);
    }
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

        if (!x || !exchange) {
          return;
        }

        console.log(x);

        const res = await exchange.getEthToTokenInputPrice(x);
        bhcRef?.current?.setValueSilently(res);
        setConverting(null);
      }}
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

        if (!x || !exchange) {
          return;
        }

        const [res, tax] = await exchange.getTokenToEthInputPriceWithTax(x);
        ethRef?.current?.setValueSilently(res);
        setTax(tax);
        setConverting(null);
      }}
      key="bhc"
    />,
  ];

  if (error) {
    return (
      <Typography variant="h5">
        <FormattedMessage defaultMessage="Failed to connect to Ethereum" id="we6FuP" />
      </Typography>
    );
  }

  const ethToTokenSwap = () => {
    const eth = ethRef.current?.value as BigNumber;
    const bhc = bhcRef.current?.value as BigNumber;

    const minTokens = bhc.mul(BigNumber.from(9999)).div(BigNumber.from(10000));

    presenter.makeTransaction<Contract.Exchange, "ethToTokenSwapInput">({
      args: [
        minTokens,
        Math.floor(Date.now() / 1000 + 60),
        {
          value: eth,
        },
      ],
      contract: Contract.Exchange,
      description: {
        action: "Swap",
        description: `Swap ${formatBNToEtherFloatFixed(eth)} ETH for ${formatBNToEtherFloatFixed(bhc)} BHC.`,
        value: eth,
      },
      fn: "ethToTokenSwapInput",
    });
  };

  const tokenToETHSwap = () => {
    const eth = ethRef.current?.value as BigNumber;
    const bhc = bhcRef.current?.value as BigNumber;

    const minEth = eth.mul(BigNumber.from(9999)).div(BigNumber.from(10000));

    presenter.makeTransaction<Contract.Exchange, "tokenToEthSwapInput">({
      args: [bhc, minEth, Math.floor(Date.now() / 1000 + 60)],
      contract: Contract.Exchange,
      description: {
        action: "Swap",
        description: `Swap ${formatBNToEtherFloatFixed(bhc)} BHC for ${formatBNToEtherFloatFixed(eth)} ETH .`,
        value: BigNumber.from(0),
      },
      fn: "tokenToEthSwapInput",
    });
  };

  const body =
    exchange || !connected ? (
      <form>
        {mode === Mode.EthToBhc ? formElements.map((el) => el) : formElements.reverse().map((el) => el)}
        <Button
          text={swapButtonText}
          onClick={() => {
            mode === Mode.EthToBhc ? ethToTokenSwap() : tokenToETHSwap();
          }}
          disabled={!exchange || isSubmitting || converting !== null || presenter.open}
          className="btn"
          distorted
          block
          borders
          large
        />
      </form>
    ) : (
      <Spinner />
    );

  return (
    <CardWrapper>
      <CardHeader>
        <Typography variant="h1">
          <FormattedMessage defaultMessage="Swap" id="swap_page_title" />
        </Typography>
      </CardHeader>

      {body}
      {children}

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
    </CardWrapper>
  );
}
