import React from "react";
import Layout from "../components/Layout/Layout";
import Wallet from "../classes/wallet";

export default function Swap() {
  const wallet = new Wallet();

  wallet.connectWithModal();

  return (
    <>
      <Layout>
        <h1>Swap</h1>
        <div className=""></div>
      </Layout>
    </>
  );
}
