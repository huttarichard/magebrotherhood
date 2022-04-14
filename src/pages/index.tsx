import About from "components/Home/About";
import Collection from "components/Home/Collection";
import Scheme from "components/Home/Ecosystem";
import GamePreview from "components/Home/GamePreview";
import Hero from "components/Home/Hero";
import Polygon from "components/Home/Polygon";
import Roadmap from "components/Home/Roadmap";
import Layout from "components/Layout/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

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
        <Scheme />
        <Polygon />
        <Collection />
        <Roadmap />
        <About />
      </Layout>
    </>
  );
}
