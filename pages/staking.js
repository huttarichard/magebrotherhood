import React from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout/Layout.js";
import { FormControl, FormLabel, FormHelperText, FormErrorMessage, Input } from "@vechaiui/react";
import { Button } from "@vechaiui/react";

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
            <Button color="primary">Button</Button>
            <Button variant="solid" color="primary">
              Button
            </Button>
            <Button variant="light" color="primary">
              Button
            </Button>
            <Button variant="ghost" color="primary">
              Button
            </Button>
            <Button variant="link" color="primary">
              Button
            </Button>
          </div>

          <div className="max-w-sm rounded bg-white overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input placeholder="jon@gmail.com" />
                <FormHelperText>Well never share your email.</FormHelperText>
              </FormControl>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
