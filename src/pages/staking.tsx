import Head from "next/head";

import Layout from "../components/Layout/Layout";

export default function Staking() {
  return (
    <>
      <Head>
        <title>Mage Brotherhood - Homepage</title>
      </Head>

      <Layout>
        <h1>Staking</h1>

        <div>
          <div>
            <button>Button</button>
          </div>

          <div>
            <div>
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
