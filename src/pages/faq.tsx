import styled from "@emotion/styled";
import { default as MuiAccordion } from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { PageLayout } from "../components/Layout/Layout";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
  padding-top: 30px;
  max-width: 800px;
  margin: 0 auto;
  padding: 15px;

  .head {
    padding: 20px;
  }
`;

const Accord = styled(MuiAccordion)`
  background-color: #141414;
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  font-size: 1.2rem;
  padding: 0 20px;
  border-radius: 0;

  ${(props) => props.theme.breakpoints.up("lg")} {
    border-radius: 5px;
  }

  &.Mui-expanded {
    background-color: ${({ theme }) => theme.palette.primary.main};
    font-size: 1.2rem;
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  font-size: 1.2rem;
`;

export default function FAQPage() {
  return (
    <PageLayout
      title="MageBrotherhood - FAQ"
      description="FAQ section with most common questions about MageBrotherhood. Join our discord community to get help and to get involved."
    >
      <Main>
        <br />

        <Typography variant="h3">FAQ & Support</Typography>
        <br />
        <Typography variant="body1">
          Some of the most frequented questions asked are answered here. We understand that not every curious mind will
          simply be happy with this list, so for such a beings there is &nbsp;
          <Link href="/">
            <a>Discord</a>
          </Link>
          .
        </Typography>

        <br />

        <h2>NFTs Tokens</h2>

        <Accord>
          <StyledAccordionSummary>Are these NFTs just another expensive image?</StyledAccordionSummary>
          <StyledAccordionDetails>
            NFTs we are selling has the preview image, but in their origin they are 3D models stored directly on IPFS.
            So <b>NO</b> you are not minting images, you are buying limited ticket to play. You are buying asset which
            appreciates long term thanks to staking.
          </StyledAccordionDetails>
        </Accord>

        <Accord>
          <StyledAccordionSummary>What is the value of MageBrotherhood NFTs?</StyledAccordionSummary>
          <StyledAccordionDetails>
            NFT on its own has no value, it is a way to represent ownership. Underlaying asset of NFT can have some
            value, but we really don't know what or how much is it, only time will tell. However what we do know is that
            all of the liquidity from sale will be pushed to the pool backing the Brotherhood Coin, pumping its price.
            What we also know that you can stake your NFT and profit in long term. That is garanteed!
          </StyledAccordionDetails>
        </Accord>

        <Accord>
          <StyledAccordionSummary>How much do I get by staking NFT?</StyledAccordionSummary>
          <StyledAccordionDetails>
            That really depends on how many NFTs you stake and what will be the weight of the NFTs you mint. We will be
            adding rewards to the staking pool on a regular basis. Therefore it should be possible to calculate returns
            on your staked NFT.
          </StyledAccordionDetails>
        </Accord>

        <Accord>
          <StyledAccordionSummary>Are NFTs limited in supply?</StyledAccordionSummary>
          <StyledAccordionDetails>
            Yes, they are, we might adjust its supply depending on demand, but in most cases we will probably issue new
            chatracters as time goes by.
          </StyledAccordionDetails>
        </Accord>

        <br />
        <h2>BHC & Exchange</h2>

        <Accord>
          <StyledAccordionSummary>Why is there selling tax?</StyledAccordionSummary>
          <StyledAccordionDetails>
            Well it essentially honeypot for people speculating on price. Short term speculators will meet this tax and
            will be forced to leave some ETH behind. This is important as it drives the ETH backing in pool and drives
            the price of BHC higher.
          </StyledAccordionDetails>
        </Accord>

        <Accord>
          <StyledAccordionSummary>How much is the selling tax?</StyledAccordionSummary>
          <StyledAccordionDetails>Currently 2%.</StyledAccordionDetails>
        </Accord>

        <Accord>
          <StyledAccordionSummary>Why is BHC useful?</StyledAccordionSummary>
          <StyledAccordionDetails>
            It allows us and community to manipulate liquidity and achive fair distribution. It give us way to reward
            players and take their assets for cheating. Please also keep in mind that most of these things will be
            subject of DAO.
          </StyledAccordionDetails>
        </Accord>

        <br />
        <h2>Affiliate</h2>

        <Accord>
          <StyledAccordionSummary>How can I be rewarded for affiliate?</StyledAccordionSummary>
          <StyledAccordionDetails>
            Start by registering your personal promo code on <Link href="/affiliate">affiliate page</Link>. Users which
            will use your code during the mint will be discounted 5% while you will be rewarded 5% in their total amount
            of mint price.
          </StyledAccordionDetails>
        </Accord>
      </Main>
    </PageLayout>
  );
}
