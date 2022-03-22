import MagicCard from "components/Collection/MagicCard";
import MagicCardText from "components/Collection/MagicCardText";
import Head from "next/head";

import Layout from "../../components/Layout/Layout";

export default function CollectionsIndex() {
  const placeholderImage = "/images/nftcharacter.png";
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <div style={{ padding: "2rem" }}>
          <h1>Collections - Characters</h1>
          {/* https://codepen.io/ykadosh/pen/ZEJLapj https://codepen.io/gayane-gasparyan/pen/jOmaBQK */}

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
      </Layout>
    </>
  );
}
