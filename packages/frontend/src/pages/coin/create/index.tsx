import type { NextPage } from "next";
import Head from "next/head";

import { CreateCoinOrganism } from "~/components/organisms/CreateCoin";

const CreateCoin: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CreateCoinOrganism />
    </>
  );
};

export default CreateCoin;