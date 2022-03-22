import styled from "@emotion/styled";
import MagicCard from "components/Collection/MagicCard";
import MagicCardText from "components/Collection/MagicCardText";
import Button from "components/ui/Button";
import Head from "next/head";

import Layout from "../../../components/Layout/Layout";

const placeholderImage = "/images/nftcharacter.png";

const CollectionItemWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 62px;
  padding-top: 110px;
`;

const CollectionItemDescription = styled.div`
  max-width: 50%;
`;

const PriceWrapper = styled.div`
  background: gray;
  height: 49px;
  width: 230px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
`;

export default function CollectionIndex() {
  const item = {
    name: "Mage",
    description:
      "A mage is a person who uses magic to do things. They can be good or bad, but they are all mages. Their magic is powerful, and they can do anything with it. Powerful mages are usually good, but sometimes they are bad. They can be powerful, but they can also be weak. They can be good, but they can also be bad. Mages can be powerful, but they can also be weak.",
    image: "/images/nftcharacter.png",
    totalSupply: 2000,
    minted: 341,
  };

  return (
    <>
      <Head>
        <title>Mage Brotherhood - {item.name}</title>
      </Head>

      <Layout>
        <div style={{ padding: "2rem" }}>
          {/* https://codepen.io/ykadosh/pen/ZEJLapj https://codepen.io/gayane-gasparyan/pen/jOmaBQK */}

          <CollectionItemWrapper>
            <MagicCard src={item.image} height="64vh" link="/collections/1/studio">
              <Button text="View in 3D Studio" style={{ position: "absolute", bottom: "20px" }} />
            </MagicCard>
            <CollectionItemDescription>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
              <p>Total Supply: {item.totalSupply}</p>
              <p>Minted: {item.minted} (17% of supply)</p>
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
                  0.3 ETH
                </span>
                <Button text="Mint" />
              </PriceWrapper>
            </CollectionItemDescription>
          </CollectionItemWrapper>

          <div style={{ padding: "110px 0" }}>
            <h1>Explore Other Characters</h1>
            <div style={{ display: "flex", flex: 1, flexDirection: "row", gap: 32 }}>
              <MagicCard src={placeholderImage} link="/collections/1">
                <MagicCardText>Mage</MagicCardText>
              </MagicCard>
              <MagicCard src={placeholderImage} link="/collections/1">
                <MagicCardText>Ranger</MagicCardText>
              </MagicCard>
              <MagicCard src={placeholderImage} link="/collections/1">
                <MagicCardText>Warrior</MagicCardText>
              </MagicCard>
              <MagicCard src={placeholderImage} link="/collections/1">
                <MagicCardText>Knight</MagicCardText>
              </MagicCard>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
