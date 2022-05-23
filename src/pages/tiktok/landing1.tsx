import GamePreview from "components/Home/GamePreview";
import Hero from "components/Home/Hero";
import JoinWithEmail from "components/Home/JoinWithEmail";
import Metaverse from "components/Home/Metaverse";
import MintCountdown from "components/Home/MintCountdown";
import Polygon from "components/Home/Polygon";
import Studio from "components/Home/Studio";
import Layout from "components/Layout/Layout";

// const

export default function HomePage() {
  return (
    <>
      <Layout footer>
        <Hero action={false} />
        <GamePreview />
        <Studio />
        <Metaverse />
        <Polygon />
        <MintCountdown />
        <JoinWithEmail />
      </Layout>
    </>
  );
}
