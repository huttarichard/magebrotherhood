import type { fullpageApi } from "@fullpage/react-fullpage";
import Head from "next/head";
import { useState } from "react";

import About from "../components/Home/About";
import Collection from "../components/Home/Collection";
import Hero from "../components/Home/Hero";
import Polygon from "../components/Home/Polygon";
import Roadmap from "../components/Home/Roadmap";
import Scheme from "../components/Home/Scheme";
import Layout from "../components/Layout/Layout";
import ReactFullpage from "../components/ReactFullPage";

export default function Home() {
  const [leaving, setLeaving] = useState<boolean>(true);

  const render = (comp: { state: any; fullpageApi: fullpageApi }) => {
    return (
      <ReactFullpage.Wrapper>
        <div className="section">
          <Hero leaving={leaving} />
        </div>
        <div className="section">
          <Scheme leaving={leaving} />
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
  };

  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <ReactFullpage
          onLeave={() => setLeaving(true)}
          afterLoad={() => setLeaving(false)}
          scrollingSpeed={800}
          render={render}
        />
      </Layout>
    </>
  );
}
