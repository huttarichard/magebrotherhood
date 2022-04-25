import styled from "@emotion/styled";
import { faArrowRight, faChartCandlestick } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageLayout } from "components/Layout/Layout";
import SwapForm from "components/Swap/Swap";
import Paper from "components/ui/Paper";
import { useRouter } from "next/router";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  padding: 30px;
  max-width: 450px;
  margin: 0 auto;

  ${(props) => props.theme.breakpoints.up("md")} {
    margin: 0 auto;
    padding-top: 0px;
    max-width: 400px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    padding-top: 30px;
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
  align-items: center;
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
    font-size: 2rem;
  }

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;

    svg {
      padding-left: 10px;
      font-size: 2rem;
    }
  }
`;

export default function Swap() {
  const router = useRouter();

  return (
    <PageLayout title="Swap" description="Buy or sell your bortherhood coins.">
      <Main>
        <SwapForm />

        <Tranding onClick={() => router.push("/swap/price")}>
          <FontAwesomeIcon icon={faChartCandlestick} />

          <div className="text">
            Trading view chart
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </Tranding>
      </Main>
    </PageLayout>
  );
}
