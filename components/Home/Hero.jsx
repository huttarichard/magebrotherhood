import styled from "@emotion/styled";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: #fff;
`;

const Background = styled.div``;

const Model = styled.div`
  position: absolute;
  top: 20%;
  right: 0;
  bottom: 0;
  left: 20%;

  model-viewer {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) {
    top: 68px;
    left: auto;
    width: 60vw;
  }

  @media (min-width: 992px) {
    top: 0;
    width: 70%;
  }
`;

const Main = styled.div`
  position: absolute;
  top: 22%;
  right: 1rem;
  bottom: 0;
  left: 1rem;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  pointer-events: none;

  h1 {
    text-transform: uppercase;
    font-style: italic;
    max-width: 230px;
    font-size: 47px;
    margin: 0 0 2rem;

    span {
      display: inline-block;
      padding-right: 5px;
      background: -webkit-linear-gradient(#8d11db, #ec12f9);
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
          background: -webkit-linear-gradient(#8d11db, #ec12f9);
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
      font-size: 100px;
      max-width: 500px;
    }

    p {
      font-size: 28px;
      max-width: 380px;
      margin-bottom: 3rem;
    }

    ul {
      li {
        margin-right: 3rem;

        span {
          &:first-of-type {
            font-size: 82px;
          }

          &:last-of-type {
            font-size: 18px;
          }
        }
      }
    }
  }
`;

export default function Hero() {
  return (
    <Wrapper>
      <Background></Background>
      <Model>
        <model-viewer
          src="/assets/1.glb"
          ios-src="/assets/1.usdz"
          camera-controls
          autoplay
          disable-zoom
          // camera-orbit="calc(-1.5rad + env(window-scroll-y) * 4rad) calc(0deg + env(window-scroll-y) * 180deg) calc(3m - env(window-scroll-y) * 1.5m)"
          environment-image="neutral"
          ar
        />
      </Model>
      <Main>
        <h1>
          Get your knight and <span>earn cash!</span>
        </h1>
        <p>NFT P2E game powered by blockchain enhanced by AR</p>
        <ul>
          <li>
            <span>10K</span>
            <span>Active Users</span>
          </li>
          <li>
            <span>8K</span>
            <span>Artworks</span>
          </li>
          <li>
            <span>2K</span>
            <span>Artists</span>
          </li>
        </ul>
      </Main>
    </Wrapper>
  );
}
