import { useState } from "react";

import Layout from "../components/Layout/Layout";

export default function Mint() {
  const [, setShowModal] = useState(true);

  return (
    <>
      <Layout>
        <h1>Mint</h1>
        <button onClick={() => setShowModal(true)}>Mint</button>
      </Layout>
      {/* <MintModal show={showModal} handleClose={() => setShowModal(false)} /> */}
    </>
  );
}
