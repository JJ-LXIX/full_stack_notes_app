import { useRouter } from "next/router";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

function EditTodo({ todo }: any) {
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [description, setDescription] = useState(todo.description);
  const router = useRouter();

  async function updateDescription(e: any) {
    e.preventDefault();
    await supabase
      .from("todo")
      .update({ description: `${description}` })
      .eq("todo_id", `${todo.todo_id}`);
    router.reload();
  }

  return (
    <>
      <button
        className="focus:outline-none text-white bg-green-800 hover:bg-green-700 shadow-neon hover:scale-105 active:scale-75 transition-all duration-300 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-3 mr-2 mb-2 "
        onClick={() => {
          setOpenModal(true);
          setDescription(todo.description);
        }}
      >
        <FaPen />
      </button>

      {openModal ? (
        <>
          <div
            className="fixed inset-0 bg-zinc-800/90 transition-none duration-300"
            onClick={() => setOpenModal(false)}
          >
            <button
              className="absolute right-[3rem] top-[10rem] text-4xl"
              onClick={(e) => {
                e.stopPropagation;
                setOpenModal(false);
                setDescription(todo.description);
              }}
            >
              X
            </button>
          </div>
          <div
            className="z-10 p-5 bg-zinc-600 h-[20vh] w-[70vw] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation;
              setOpenModal(true);
            }}
          >
            <input
              type="text"
              className="w-full h-[3rem] bg-zinc-700 p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={(e) => updateDescription(e)}>Edit</button>
          </div>
        </>
      ) : null}
    </>
  );
}

export default EditTodo;
