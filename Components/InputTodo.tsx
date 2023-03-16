import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

function InputTodo() {
  const [description, setDescription] = useState("");
  const router = useRouter();

  // Add todo
  async function formSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (description === "") return;

    const { data, error } = await supabase
      .from("todo")
      .insert([{ description: `${description}` }]);
    router.reload();

    if (error) {
      console.log(error);
    }
  }

  // async function formSubmit(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   if (description === "") return;
  //   try {
  //     const body = { description };
  //     const response = await fetch("http://localhost:3000/api/todos", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });
  //     (window as Window).location = "/";
  //     // (window as Window).location = "/";
  //     router.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className="w-full flex flex-col justify-around items-center  h-[20vh] ">
      <h1 className="text-xl lg:text-3xl font-bold ">Full Stack Todo List</h1>
      <form
        className="flex gap-1 sm:gap-2 lg:gap-4 max-w-[80%] px-2"
        onSubmit={formSubmit}
      >
        <input
          type="text"
          className="bg-zinc-600 w-[12rem] sm:w-[14rem] md:w-[16rem] lg:w-[18rem] px-2 md:px-4 rounded-lg lg:pr-20 font-semibold placeholder:text-zinc-300"
          value={description}
          placeholder="Enter to-do here!"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button className="flex justify-center items-center h-2 p-4 lg:h-5 lg:p-5 border-2 rounded-lg hover:scale-110 active:scale-95 transition-all duration-300">
          Add
        </button>
      </form>
    </div>
  );
}

export default InputTodo;
