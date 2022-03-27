import styled from "@emotion/styled";
import { faDiscord, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import heroBg2 from "assets/images/heroBg2.png";
import heroGhost from "assets/images/heroGhost.png";
import React from "react";
import { FormattedMessage } from "react-intl";

import ModelViewerDynamic from "../ui/ModelViewerDynamic";

const Wrapper = styled.div`
  position: relative;
  background-color: #eee;
  height: 100%;
  max-height: calc(100vh - 60px);
  height: calc(100vh - 60px);

  @supports (-webkit-touch-callout: none) {
    height: calc(100vh - 120px);
  }

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

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparent url(${heroGhost.src}) no-repeat;
    background-size: contain;
    background-position: center left;
  }

  @media (min-width: 1200px) {
    background-position-x: 10vw;
  }
`;

const Model = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

  model-viewer {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) {
    left: auto;
    /* width: 60vw; */
  }

  @media (min-width: 992px) {
    top: 0;
    /* width: 70%; */
  }

  @media (min-width: 1200px) {
    /* top: 10%; */
    /* bottom: -30%; */
    /* width: 60%; */

    model-viewer {
    }
  }

  @media (min-width: 1600px) {
    top: 0;
  }
`;

const Main = styled.div`
  position: absolute;
  top: 0px;
  right: 1rem;
  bottom: 50px;
  left: 1rem;
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* pointer-events: none; */
  color: ${({ theme }) => theme.text2};

  h1 {
    text-transform: uppercase;
    font-style: italic;
    max-width: 230px;
    font-size: 47px;
    margin: 0 0 2rem;

    span {
      padding-right: 5px;
      display: inline-block;
      background: linear-gradient(${({ theme }) => theme.primary2}, ${({ theme }) => theme.primary1});
      background: -webkit-linear-gradient(${({ theme }) => theme.primary2}, ${({ theme }) => theme.primary1});
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    margin: 0 0 2rem;
    max-width: 200px;
    font-size: 20px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 1rem;

      span {
        display: inline-block;
        font-weight: 700;

        &:first-of-type {
          font-size: 42px;
          background: linear-gradient(${({ theme }) => theme.primary2}, ${({ theme }) => theme.primary1});
          background: -webkit-linear-gradient(${({ theme }) => theme.primary2}, ${({ theme }) => theme.primary1});
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        &:last-child {
          text-transform: uppercase;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  @media (min-width: 768px) {
    top: 68px;
    justify-content: center;

    h1 {
      max-width: 320px;
      font-size: 68px;
      line-height: 0.9;

      span {
        padding-right: 10px;
      }
    }

    p {
      max-width: 350px;
      font-size: 26px;
    }

    ul {
      li {
        margin-right: 2.5rem;

        span {
          &:first-of-type {
            font-size: 54px;
          }
        }
      }
    }
  }

  @media (min-width: 992px) {
    top: 0;
  }

  @media (min-width: 1200px) {
    left: 3rem;

    h1 {
      font-size: 80px;
      max-width: 550px;
    }

    p {
      font-size: 28px;
      max-width: 550px;
      margin-bottom: 3rem;
    }

    ul {
      li {
        margin-right: 3rem;

        span {
          &:first-of-type {
            font-size: 70px;
          }

          &:last-of-type {
            font-size: 18px;
          }
        }
      }
    }
  }

  @media (min-width: 1700px) {
    left: 4rem;

    h1 {
      max-width: 800px;
    }

    p {
      max-width: 700px;
    }
  }
`;

const Actions = styled.div`
  display: none;

  @media (min-width: 992px) {
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
    }
  }
`;

// const origin = typeof window !== "undefined" ? window?.location?.origin : "";

export default function Hero() {
  return (
    <Wrapper>
      <Background></Background>
      <Model>
        <ModelViewerDynamic
          src="/assets/5.glb"
          ar
          ios-src={`https://magebrotherhood.fra1.cdn.digitaloceanspaces.com/knight.usdz#custom=https://magebrotherhood.com/mint.html`}
          ar-modes="webxr scene-viewer quick-look"
          animating
          autoplay
          camera-orbit="-7.436deg 107.8deg auto"
          camera-target="-0.6m 1.5m -1m"
          environment-image="neutral"
          loading="eager"
        />
      </Model>
      <Main>
        <div>
          <h1>
            Play for victory, earn <span>rewards.</span>
          </h1>
          <p>NFT P2E game powered by blockchain enhanced by AR, managed by DAO.</p>

          <ul>
            <li>
              <span>8K</span>
              <span>NFT LEFT</span>
            </li>
            <li>
              <span>$.0001</span>
              <span>
                <FormattedMessage defaultMessage="BROTHERHOOD COIN" id="owdz74" />
              </span>
            </li>
          </ul>
        </div>
      </Main>
      <Actions>
        <ul>
          <li>
            <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <FontAwesomeIcon icon={faDiscord} size={"2x"} />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} size={"2x"} />
            </a>
          </li>
        </ul>
      </Actions>
    </Wrapper>
  );
}
