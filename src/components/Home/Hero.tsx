import styled from "@emotion/styled";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@mui/material";
import heroGhost from "assets/images/background.jpg";
import heroBg2 from "assets/images/heroBg2.png";
import { ARButton } from "components/Tokens/Buttons";
import Button from "components/ui/Button";
import { useBHCUSDPrice } from "hooks/useMarketData";
import { useTracking } from "hooks/useTracking";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";

const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 60px);
  min-height: 772px;

  ${(props) => props.theme.breakpoints.up("lg")} {
    height: 100%;
    max-height: 100vh;
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: transparent url(${heroBg2.src}) no-repeat;
  background-size: cover;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparent url(${heroGhost.src}) no-repeat;
    background-size: cover;
    background-position: center left;
    z-index: -1;
  }

  @media (min-width: 1200px) {
    background-position-x: 10vw;
  }
`;

const Model = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100% + 140px);
`;

const Main = styled(Grid)`
  position: absolute;
  top: 100px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 100px);
  padding: 20px;
  color: ${({ theme }) => theme.text2};
  align-items: flex-start;

  ${(props) => props.theme.breakpoints.up("md")} {
    align-items: center;
    padding: 40px;
    height: 100%;
    top: 0;
  }
`;

const TextArea = styled(Grid)`
  ${(props) => props.theme.breakpoints.up("md")} {
    padding-top: 120px;
  }
`;

const Headline = styled.h1`
  text-transform: uppercase;
  font-style: italic;
  font-size: 4rem;
  margin: 0 0 2rem;
  line-height: 1;

  span {
    padding-right: 5px;
    display: inline-block;
    background: linear-gradient(${({ theme }) => theme.primary2}, ${({ theme }) => theme.primary1});
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  ${(props) => props.theme.breakpoints.up("lg")} {
    font-size: 5rem;
  }

  @media screen and (max-width: 800px) {
    font-size: 3.5rem;
  }
`;

const Subheadline = styled.p`
  margin: 0 0 2rem;
  font-size: 1.3rem;
  max-width: 75%;

  ${(props) => props.theme.breakpoints.up("lg")} {
    font-size: 1.8rem;
  }
`;

const BHCPriceWrapper = styled.div`
  margin-top: 10px;

  span {
    position: relative;
    left: 10px;
    display: inline-block;
    font-weight: 700;
    font-size: 1.5rem;
    background: linear-gradient(${({ theme }) => theme.primary2}, ${({ theme }) => theme.primary1});
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    margin-top: 20px;
    span {
      font-size: 2.5rem;
    }
  }
`;

function BHCPrice() {
  const price = useBHCUSDPrice();
  if (!price)
    return (
      <BHCPriceWrapper>
        BHC:
        <span>...</span>
      </BHCPriceWrapper>
    );

  return (
    <BHCPriceWrapper>
      BHC:
      <span>
        <FormattedNumber
          style="currency"
          currency="USD"
          currencyDisplay="narrowSymbol"
          unitDisplay="narrow"
          value={price}
          maximumFractionDigits={6}
          minimumFractionDigits={2}
        />
      </span>
    </BHCPriceWrapper>
  );
}

const SocialLinksWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 2rem;
  right: 2rem;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  li {
    margin-right: 2rem;

    &:last-child {
      margin-right: 0;
    }
  }

  a {
    display: block;
    color: #fff;

    ${(props) => props.theme.breakpoints.only("xs")} {
    }
  }
`;

function SocialLinks() {
  const tracking = useTracking();

  return (
    <SocialLinksWrapper>
      <ul>
        <li>
          <a
            href="https://discord.gg/HgPQAHzp3Z"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            onClick={() => tracking.clickImportantButton()}
          >
            <FontAwesomeIcon icon={faDiscord} size={"2x"} />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/MageBrotherhood"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            onClick={() => tracking.clickImportantButton()}
          >
            <FontAwesomeIcon icon={faTwitter} size={"2x"} />
          </a>
        </li>
      </ul>
    </SocialLinksWrapper>
  );
}

const Character = dynamic(() => import("./Character"), {
  ssr: false,
});

export default function Hero() {
  const router = useRouter();

  return (
    <Wrapper>
      <Background />

      <Model>
        <Character />
      </Model>

      <Main container>
        <TextArea item xs={12} md={8}>
          <Headline>
            <FormattedMessage
              defaultMessage="Play for victory, earn <span>rewards.</span>"
              values={{
                span: (chunks: any) => <span>{chunks}</span>,
              }}
              id="home_hero_title"
            />
          </Headline>

          <Subheadline>
            <FormattedMessage
              defaultMessage="NFT P2E game powered by blockchain enhanced by AR, managed by DAO."
              id="home_hero_subtitle"
            />
          </Subheadline>

          <Button text="Tokens" distorted borders onClick={() => router.push("/tokens")} />

          <BHCPrice />
        </TextArea>

        <Grid item xs={12} alignSelf="end">
          <ARButton
            folded={false}
            ar={{
              glb: "/models/tokens/2/model.glb",
              usdz: "/models/tokens/2/model.usdz",
              reality: "/models/welcome_mage.reality",
              link: "https://magebrotherhood.com",
              resizable: true,
            }}
          />
        </Grid>
      </Main>

      <SocialLinks />
    </Wrapper>
  );
}
