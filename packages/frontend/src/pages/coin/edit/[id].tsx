import type { NextPage } from "next";
import Head from "next/head";

import { UpdateCoinOrganism } from "~/components/organisms/UpdateCoin";

const EditCoin: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Edit coin</h1>
      <UpdateCoinOrganism />
    </>
  );
};

export default EditCoin;
