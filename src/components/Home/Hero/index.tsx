import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import shape from "assets/images/shape.png";
import List from "components/Socials/List";
import Button from "components/ui/Button";
import useAR from "hooks/useAR";
import { ARMode } from "lib/ar";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { isMobileOnly } from "react-device-detect";

const Wrapper = styled.div`
  position: relative;
  height: calc(100vh - 60px);
  min-height: 772px;
  box-shadow: 0px 8px 0px 0px #ffffff1a;
  max-height: 100vh;

  ${(props) => props.theme.breakpoints.up("lg")} {
    height: 100%;
    max-height: 100vh;
  }

  ${() =>
    isMobileOnly &&
    css`
      max-height: calc(100vh - 140px);
      min-height: 672px;
    `}
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: transparent url(${shape.src}) no-repeat;
  background-size: cover;

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

  max-width: 1600px;
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
`;

const Headline = styled.h1`
  text-transform: uppercase;
  font-style: italic;
  font-size: 4rem;
  margin: 0 0 2rem;
  line-height: 1;
  color: white;

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
  color: white;

  ${(props) => props.theme.breakpoints.up("lg")} {
    font-size: 1.8rem;
    max-width: 75%;
  }
`;

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
  const [button, setButton] = useState<JSX.Element>();

  const ars = useAR({
    glb: "/models/welcome_mage.glb",
    reality: "/models/welcome_mage.reality",
    link: "https://magebrotherhood.com",
    resizable: true,
  });

  useEffect(() => {
    const button =
      ars.mode === ARMode.NONE ? (
        <Button text="Explore Tokens" distorted borders onClick={() => router.push("/tokens")} />
      ) : (
        <Button
          text={["Explore AR reality", ars.launching && ars.progress > 0 ? " (" + ars.progress + "%)" : ""].join("")}
          disabled={ars.launching}
          distorted
          borders
          onClick={ars.launcher}
        />
      );
    setButton(button);
  }, [ars]);

  return (
    <Wrapper>
      <Background />

      <Model>
        <Character />
      </Model>

      <Main container>
        <TextArea item xs={12} md={8}>
          <Headline>
            Play for victory, <br /> earn <span>rewards.</span>
          </Headline>

          <Subheadline>
            NFT P2E game powered by blockchain enhanced by AR, <br /> managed by DAO.
          </Subheadline>

          {button}
        </TextArea>
      </Main>

      <SocialLinksWrapper>
        <List />
      </SocialLinksWrapper>
    </Wrapper>
  );
}
