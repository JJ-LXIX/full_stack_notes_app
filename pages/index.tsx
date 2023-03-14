import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import InputTodo from "../Components/InputTodo";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Full Stack Notes App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-zinc-900 text-zinc-50">
        <InputTodo />
      </main>
    </div>
  );
};

export default Home;
