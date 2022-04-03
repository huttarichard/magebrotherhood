import mustConnect, { ICoin, useMustContract } from "components/ui/ConnectBoundary";
import TransactionWindow from "components/ui/TransactionWindow";
import { Name } from "lib/web3/contracts";
import Link from "next/link";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import SwapForm from "./Form";

const steps = [
  {
    error: false,
    label: "Initiating",
    labelOptional: "GO!",
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis veritatis quia eligendi ipsum ex tempore
        sapiente ea consequatur quisquam fugiat corrupti minima, aut omnis. Reprehenderit non facilis repellendus
        praesentium architecto.
      </p>
    ),
  },
  {
    error: false,
    label: "Waiting for confirmation",
    labelOptional: "Wait for it...",
    content: (
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati autem quisquam similique magni architecto
        voluptatibus qui eius sit iure eveniet libero eum, quia, sapiente minima molestias eaque modi ducimus
        voluptatum?
      </p>
    ),
  },
  {
    error: false,
    label: "Finalizing",
    labelOptional: "Almost there!",
    labelErrorOptional: "Failed!",
    content: (
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum, aut officia et possimus ratione, in provident
        magnam minus qui hic odit quis enim praesentium numquam deleniti adipisci aperiam optio quasi? Ipsam inventore
        consequatur accusantium ex? Magni animi, adipisci doloremque temporibus distinctio commodi consequuntur tenetur?
      </p>
    ),
  },
];

function Swap() {
  const coin = useMustContract<ICoin>(Name.Coin);
  const [openModal, setOpenModal] = useState<boolean>(false);
  // const [tax, setTax] = useState<number | null>(null);

  return (
    <>
      <SwapForm
        coin={coin}
        onTransactionSubmit={(t) => {
          console.info(t);
          setOpenModal(true);
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

      <TransactionWindow activeStep={0} open={openModal} steps={steps}></TransactionWindow>
    </>
  );
}

export default mustConnect(Swap, {
  contracts: [Name.Coin],
  displayName: "ConnectedSwap",
  readOnly: false,
  wallet: true,
});
