import type { NextPage } from "next";
import Head from "next/head";
import InputTodo from "../Components/InputTodo";
import ListTodo from "../Components/ListTodo";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50">
      <Head>
        <title>Full Stack Notes App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen  pb-10">
        <InputTodo />
        <ListTodo />
      </main>
    </div>
  );
};

export default Home;
