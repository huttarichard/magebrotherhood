import React from "react";
import Head from "next/head";
import Layout from "../components/Layout/Layout.js";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <h1>FAQ</h1>
      </Layout>
    </>
  );
}
