import Collection from "components/Home/Collection";
import GamePreview from "components/Home/GamePreview";
import Hero from "components/Home/Hero";
import Join from "components/Home/Join";
import Metaverse from "components/Home/Metaverse";
import Polygon from "components/Home/Polygon";
import Studio from "components/Home/Studio";
import Swap from "components/Home/Swap";
import Layout from "components/Layout/Layout";

// const 

export default function HomePage() {
  return (
    <>
      {/* add raising coin
      add notion that we investment into nft will be returned
      add how we gonna decentralize the game
      add tokenomics
      add how game is not a ponzi
      exolain better staking
      add AR
      add swap from on homepage
      add DAO
      integrate better socials
      add metaverse
      explain how artist will be rewarded for their art
      upcomming collection */}

      <Layout footer>
        <Hero />
        <GamePreview />
        <Collection />
        <Studio />
        <Metaverse />
        <Polygon />
        <Swap />
        <Join />
      </Layout>
    </>
  );
}
