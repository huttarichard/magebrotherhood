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
