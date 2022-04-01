import styled from "@emotion/styled";
import { faArrowRight, faChartCandlestick } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "components/Layout/Layout";
import SwapForm from "components/Swap/Form";
import Paper from "components/ui/Paper";
import TransactionWindow from "components/ui/TransactionWindow";
import useCoinContract from "hooks/useCoinContract";
import useWeb3 from "hooks/useWeb3";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

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
  max-width: 390px;

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

export default function Swap() {
  const ethers = useWeb3();
  const { contract: coin, error, ready } = useCoinContract(ethers);
  const router = useRouter();
  // const [tax, setTax] = useState<number | null>(null);

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Layout>
      <Main>
        <SwapForm coin={coin} onTransactionSubmit={(t) => setOpenModal(true)}></SwapForm>
        {error && <p>{error.message}</p>}

        <Tranding onClick={() => router.push("/price")}>
          <FontAwesomeIcon icon={faChartCandlestick} />

          <div className="text">
            <FormattedMessage defaultMessage="Trading view chart" id="swap_page_chart_button_text" />
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </Tranding>

        <TransactionWindow activeStep={0} open={openModal} steps={steps}></TransactionWindow>
      </Main>
    </Layout>
  );
}
