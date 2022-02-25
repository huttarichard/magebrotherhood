import React from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout/Layout.js";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <h1>Staking</h1>

        <div className="pt-12">
          <div className="flex flex-wrap w-full p-8 space-x-2">
            <button>Button</button>
          </div>

          <div className="max-w-sm rounded bg-white overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div id="email">
                <span>Email address</span>
                <input placeholder="jon@gmail.com" />
                <p>Well never share your email.</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
