import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Full Stack Notes App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1>Hello World </h1>
      </main>
    </div>
  );
};

export default Home;
