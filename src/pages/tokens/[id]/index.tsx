import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import Layout from "components/Layout/Layout";
import Button from "components/ui/Button";
import ModelViewerDynamic from "components/ui/ModelViewerDynamic";
import Spinner from "components/ui/Spinner";
import { FullToken, useToken } from "hooks/useTokens";
import { useWeb3TransactionPresenter } from "hooks/useWeb3Transaction";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";

const Wrapper = styled.div<{ height: number }>`
  position: relative;
  height: ${(props) => props.height}px;

  ${(props) => props.theme.breakpoints.up("lg")} {
    height: 100%;
    max-height: 100vh;
  }

  .Hotspot {
  }

  .Hotspot:not([data-visible]) {
    background: transparent;
    border: 4px solid #fff;
    box-shadow: none;
    height: 32px;
    pointer-events: none;
    width: 32px;
  }

  .Hotspot > * {
    opacity: 1;
    transform: translateY(-50%);
  }

  .HotspotAnnotation {
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    color: rgba(0, 0, 0, 0.8);
    display: block;
    font-family: Futura, Helvetica Neue, sans-serif;
    font-size: 18px;
    font-weight: 700;
    left: calc(100% + 1em);
    max-width: 128px;
    overflow-wrap: break-word;
    padding: 0.5em 1em;
    position: absolute;
    top: 50%;
    width: max-content;
  }

  .Hotspot:not([data-visible]) > * {
    opacity: 0;
    pointer-events: none;
    transform: translateY(calc(-50% + 4px));
    transition: transform 0.3s, opacity 0.3s;
  }
`;

const Actions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;

  @media (min-width: 992px) {
    top: 2rem;
    right: 3rem;
  }
`;

const PriceWrapper = styled.div`
  background: #e4e4e4;
  height: 50px;
  width: 240px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
`;

const Card = styled.div`
  background: white;
  width: 400px;
  color: black;
  padding: 5px 20px;
  padding-bottom: 15px;
  font-size: 18px;

  position: absolute;
  bottom: 1rem;
  right: 1rem;
  border-radius: 5px;

  @media (min-width: 992px) {
    bottom: 2rem;
    right: 3rem;
  }
`;

interface ViewProps {
  item: FullToken;
  reference: HTMLDivElement | null;
}

export function View({ item, reference }: ViewProps) {
  const { mint } = useWeb3TransactionPresenter();

  return (
    <>
      <a rel="ar" href={`${window.location.origin}/api/tokens/${item.id}/usdz`}>
        Model
      </a>
      <ModelViewerDynamic
        style={{ width: "100%", height: "100%" }}
        // src={item.models.glb}
        // src="/models/black_knight.glb"
        ios-src={`/api/tokens/${item.id}/usdz`}
        environment-image="neutral"
        skybox-image="/assets/studio.hdr"
        ar-modes="webxr scene-viewer quick-look"
        max-camera-orbit="Infinity 90deg 0"
        camera-orbit="0deg 75deg 2m"
        min-field-of-view="0deg"
        camera-controls
        autoplay
        ar
        bounds="tight"
        minimum-render-scale="1"
        // enable-pan
      />
      <Actions>
        <Link href="/tokens" passHref>
          <Button text="Close" />
        </Link>
      </Actions>

      {/* <Card>
        <b>{item.name}</b>
        <p>{item.description}</p>
        <div>
          <PriceWrapper>
            <span
              style={{
                fontSize: "1.2rem",
                padding: "0 12px",
                height: "49px",
                lineHeight: "45px",
                fontFamily: "monospace",
              }}
            >
              {item.priceETH} ETH
            </span>
            <Button
              small
              style={{ height: "50px", width: "115px", borderRadius: "4px" }}
              text="Mint"
              onClick={() => {
                mint(item.id, 1);
              }}
            />
          </PriceWrapper>
        </div>
      </Card> */}
    </>
  );
}

export default function Studio() {
  const router = useRouter();
  const token = useToken(router.query.id as string, { metadata: true });
  const ref = useRef<HTMLDivElement | null>(null);
  const [h, setH] = useState<number>(0);
  const dimensions = useWindowSize();

  useEffect(() => setH(dimensions.height - 60), [dimensions.height]);

  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <Global
          styles={css`
            body,
            html {
              height: 100%;
              width: 100%;
              overflow: hidden;
              position: fixed;
              * {
                user-select: none;
              }
            }
          `}
        ></Global>
        <Wrapper ref={ref} height={h}>
          {token.loading ? <Spinner /> : <View reference={ref.current} item={token.data as FullToken} />}
        </Wrapper>
      </Layout>
    </>
  );
}
