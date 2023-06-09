import type { NextPage } from "next";
import Head from "next/head";

import { LoginForm } from "~/components/organisms/LoginForm";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-1/2 flex-col gap-4">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
