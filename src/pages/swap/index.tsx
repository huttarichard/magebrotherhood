import styled from "@emotion/styled";
import { faArrowRight, faChartCandlestick } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "components/Layout/Layout";
import SwapForm from "components/Swap/Swap";
import Paper from "components/ui/Paper";
import { useRouter } from "next/router";
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

export default function Swap() {
  const router = useRouter();

  return (
    <Layout>
      <Main>
        <SwapForm />

        <Tranding onClick={() => router.push("/swap/price")}>
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
