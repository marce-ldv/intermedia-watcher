import { type NextPage } from "next";
import Head from "next/head";
import { CustomTable } from "~/components/organisms/Table";
import { Suspense } from "react";
import { Spinner } from "flowbite-react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Intermedia Watcher</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*<h1 className="text-4xl font-bold text-white">Intermedia Watcher</h1>*/}
      <Suspense fallback={<Spinner />}>
        <CustomTable />
      </Suspense>
    </>
  );
};

export default Home;
