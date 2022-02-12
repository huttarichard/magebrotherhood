import React from "react";
import Head from "next/head";
import ReactFullpage from "../components/ReactFullPage";
import Layout from "../components/Layout/Layout.js";
import Slide1 from "../components/Home/Welcome.js";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <ReactFullpage
          scrollingSpeed={1000} /* Options here */
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
