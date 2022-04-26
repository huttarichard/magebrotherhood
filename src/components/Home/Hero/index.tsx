import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import heroGhost from "assets/images/background.jpg";
import heroBg2 from "assets/images/heroBg2.png";
import List from "components/Socials/List";
import { ARButton } from "components/Tokens/Buttons";
import Button from "components/ui/Button";
import { useBHCUSDPrice } from "hooks/useMarketData";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

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
  height: 100%;

  canvas {
    height: calc(100% + 50px);
    width: calc(100% + 50px);
  }
`;

const Main = styled(Grid)`
  position: absolute;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  color: ${({ theme }) => theme.text2};
  align-items: flex-start;

  max-width: 1800px;
  margin: 0 auto;

  ${(props) => props.theme.breakpoints.up("md")} {
    align-items: center;
    padding: 40px;
    height: 100%;
    top: 0;
  }
`;

const TextArea = styled(Grid)`
  padding-top: 20px;
  text-align: center;

  ${(props) => props.theme.breakpoints.up("md")} {
    text-align: left;
    max-width: 1000px;
  }

  @media screen and (min-height: 1000px) and (min-width: 900px) {
    padding-top: 200px;
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
    font-size: 2.5rem;
  }
`;

const Subheadline = styled.p`
  margin: 0 0 2rem;
  font-size: 1.3rem;

  ${(props) => props.theme.breakpoints.up("lg")} {
    font-size: 1.8rem;
    max-width: 75%;
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
      <span>${price.toFixed(8)}</span>
    </BHCPriceWrapper>
  );
}

const SocialLinksWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: none;

  ${(props) => props.theme.breakpoints.up("lg")} {
    display: block;
  }

  a {
    display: block;
    color: #fff;

    ${(props) => props.theme.breakpoints.only("xs")} {
    }
  }
`;

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
            Play for victory, earn <span>rewards.</span>
          </Headline>

          <Subheadline>NFT P2E game powered by blockchain enhanced by AR, managed by DAO.</Subheadline>

          <Button text="Tokens" distorted borders onClick={() => router.push("/tokens")} />

          <BHCPrice />
        </TextArea>

        <Grid item xs={12} alignSelf="end">
          <ARButton
            folded={false}
            ar={{
              glb: "/models/welcome_mage.glb",
              reality: "/models/welcome_mage.reality",
              link: "https://magebrotherhood.com",
              resizable: true,
            }}
          />
        </Grid>
      </Main>

      <SocialLinksWrapper>
        <List />
      </SocialLinksWrapper>
    </Wrapper>
  );
}
