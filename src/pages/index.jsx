import Head from "next/head";
import ReactFullpage from "../components/ReactFullPage";
import Layout from "../components/Layout/Layout";
import Hero from "../components/Home/Hero";
import Scheme from "../components/Home/Scheme";
import Polygon from "../components/Home/Polygon";
import Collection from "../components/Home/Collection";
import Roadmap from "../components/Home/Roadmap";
import About from "../components/Home/About";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <ReactFullpage
          scrollingSpeed={1000}
          render={({ state, fullpageApi }) => {
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
