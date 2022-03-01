import Head from "next/head";
import ReactFullpage from "../components/ReactFullPage";
import Layout from "../components/Layout/Layout";
import Slide1 from "../components/Home/Welcome";

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
                <div className="section home">
                  <Slide1 />
                </div>

                <div className="section">
                  <p>Section 1 (welcome to fullpage.js)</p>
                </div>
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </Layout>
    </>
  );
}
