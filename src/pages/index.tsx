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
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleOnLeave = (origin: any, destination: any, direction: any) => {
    setCurrentIndex(destination.index);
  };

  const render = () => {
    return (
      <ReactFullpage.Wrapper>
        <div className="section">
          <Hero active={currentIndex === 0} />
        </div>
        <div className="section">
          <Scheme active={currentIndex === 1} />
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
        <ReactFullpage onLeave={handleOnLeave} scrollingSpeed={800} render={render} />
      </Layout>
    </>
  );
}
