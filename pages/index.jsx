import Head from "next/head";
import ReactFullpage from "../components/ReactFullPage";
import Layout from "../components/Layout/Layout";
import Hero from "../components/Home/Hero";

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
                  <p>Section 2</p>
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </Layout>
    </>
  );
}
