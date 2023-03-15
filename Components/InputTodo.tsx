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
    if (data) {
      console.log(data);
    }
  }
  return (
    <div className="w-full flex flex-col justify-around items-center  h-[20vh] ">
      <h1 className="text-3xl font-bold">Full Stack Todo List</h1>
      <form className="flex gap-5 " onSubmit={formSubmit}>
        <input
          type="text"
          className="bg-zinc-600 px-4 rounded-sm font-semibold"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button className="flex justify-center items-center h-5 p-5 border-2 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300">
          Add
        </button>
      </form>
    </div>
  );
}

export default InputTodo;
