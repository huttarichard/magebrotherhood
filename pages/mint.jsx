import { useState } from "react";
import Layout from "../components/Layout/Layout";
import MintModal from "../components/modals/MintModal";

export default function Mint() {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <Layout>
        <h1>Mint</h1>
        <button onClick={() => setShowModal(true)}>Mint</button>
      </Layout>
      <MintModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
}
