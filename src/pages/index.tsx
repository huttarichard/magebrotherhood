import Head from "next/head";

import About from "../components/Home/About";
import Collection from "../components/Home/Collection";
import Hero from "../components/Home/Hero";
import Polygon from "../components/Home/Polygon";
import Roadmap from "../components/Home/Roadmap";
import Scheme from "../components/Home/Scheme";
import Layout from "../components/Layout/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <div className="section">
          <Hero />
        </div>
        <div className="section">
          <Scheme />
        </div>
        <div className="section">
          <Polygon />
        </div>
        <div className="section">
          <Collection />
        </div>
        <div className="section">
          <Roadmap />
        </div>
        <div className="section">
          <About />
        </div>
      </Layout>
    </>
  );
}
