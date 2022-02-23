import React from "react";
import Layout from "../components/Layout/Layout";
import Wallet from "../classes/wallet";

export default function Account() {
  const wallet = new Wallet();

  wallet.connectWithModal();

  window.wallet = wallet;

  return (
    <>
      <Layout>
        <h1>Account</h1>
      </Layout>
    </>
  );
}
