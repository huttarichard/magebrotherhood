import Head from "next/head";

import About from "../components/Home/About";
import Collection from "../components/Home/Collection";
import Hero from "../components/Home/Hero";
import Polygon from "../components/Home/Polygon";
import Roadmap from "../components/Home/Roadmap";
import Scheme from "../components/Home/Scheme";
import Layout from "../components/Layout/Layout";
import ReactFullpage from "../components/ReactFullPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <ReactFullpage
          scrollingSpeed={1000}
          render={() => {
            return (
              <ReactFullpage.Wrapper>
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
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </Layout>
    </>
  );
}
