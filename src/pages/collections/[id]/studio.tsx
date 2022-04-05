// import { ModelViewerElement } from "@google/model-viewer/lib/model-viewer";
import styled from "@emotion/styled";
import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import Button from "components/ui/Button";
import { useWeb3TransactionPresenter } from "components/ui/TransactionPresenter";
import { Contract } from "lib/web3/contracts";
import Head from "next/head";
import Link from "next/link";

import Layout from "../../../components/Layout/Layout";
import ModelViewerDynamic from "../../../components/ui/ModelViewerDynamic";

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
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
  width: 230px;
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

export default function Studio() {
  const { makeTransaction } = useWeb3TransactionPresenter();

  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <Wrapper>
          <style jsx>{`
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
          `}</style>
          <ModelViewerDynamic
            style={{ width: "100%", height: "100%" }}
            src="/assets/5.glb"
            poster="/data/2/poster.webp"
            environment-image="/assets/studio.hdr"
            skybox-image="/assets/studio.hdr"
            ar-modes="webxr scene-viewer quick-look"
            animation-name="Armature.001|mixamo.com|Layer0"
            max-camera-orbit="Infinity 90deg auto"
            min-field-of-view="80deg"
            shadow-intensity="1"
            camera-controls
            disable-zoom
            autoplay
            ar
          >
            <div
              className="Hotspot"
              slot="hotspot-1"
              data-position="-0.32750255835575026m 1.388571179507904m 0.4491652455122156m"
              data-normal="-0.2986048198879707m -0.4614395947503901m 0.8354092781004223m"
              data-visibility-attribute="visible"
            >
              <div className="HotspotAnnotation">
                <h1>Knight</h1>
              </div>
            </div>
          </ModelViewerDynamic>
          <Actions>
            <Link href="/collections" passHref>
              <Button text="Close" />
            </Link>
          </Actions>
          <Card>
            <p>
              Knight is a powerful warrior. He is a master of sword fighting and is able to use his sword to deal damage
              to his enemies. He is also a master of defending himself and his allies. Damage dealt by Knight is
              increased by his level significantly.
            </p>
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
                  0.1 ETH
                </span>
                <Button
                  small
                  style={{ height: "50px", width: "115px", borderRadius: "4px" }}
                  text="Mint"
                  onClick={() => {
                    makeTransaction<Contract.Playables, "mint">({
                      description: {
                        action: "Mint",
                        description: "Mint Knight",
                        value: parseUnits("0.3", "ether"),
                      },
                      fn: "mint",
                      args: [
                        {
                          tokenId: BigNumber.from("1"),
                          amount: BigNumber.from("1"),
                          discount: "",
                        },
                      ],
                      contract: Contract.Playables,
                    });
                  }}
                />
              </PriceWrapper>
            </div>
          </Card>
        </Wrapper>
      </Layout>
    </>
  );
}
