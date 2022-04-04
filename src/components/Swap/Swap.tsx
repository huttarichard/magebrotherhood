import Spinner from "components/ui/Spinner";
import { useCoinContract } from "hooks/useContract";
import { useWeb3Remote } from "hooks/useWeb3";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

import SwapForm from "./Form";

export default function Swap() {
  const web3 = useWeb3Remote();
  const { connected, contract, error } = useCoinContract(web3);

  if (error) {
    return <>{error.message}</>;
  }

  if (!connected) {
    return <Spinner />;
  }

  return (
    <SwapForm
      coin={contract}
      onTransactionSubmit={(t) => {
        console.info(t);
      }}
    >
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
    </SwapForm>
  );
}
