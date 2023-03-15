import { useRouter } from "next/router";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
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
        className=" text-white bg-green-800 hover:bg-green-700 shadow-neon hover:scale-110 active:scale-75 
        transition-all duration-300 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-3 mr-2"
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
            className="fixed inset-0 bg-zinc-800/95 transition-none  duration-300"
            onClick={() => setOpenModal(false)}
          >
            <button
              className="absolute right-[25%] top-[30%] text-4xl"
              onClick={(e) => {
                e.stopPropagation;
                setOpenModal(false);
                setDescription(todo.description);
              }}
            >
              <AiOutlineCloseCircle className="text-white" />
            </button>
          </div>
          <div
            className="z-10 p-5 bg-zinc-900 h-[20vh] w-[70vw] lg:w-[50vw] xl:w-[40vw] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-lg shadow-purple-700 rounded-2xl flex justify-around items-center"
            onClick={(e) => {
              e.stopPropagation;
              setOpenModal(true);
            }}
          >
            <input
              type="text"
              className="w-[80%] h-[3rem] bg-zinc-700 px-4 rounded-lg text-white font-semibold"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="max-w-sm  text-white bg-purple-700 hover:bg-purple-900  focus:ring-red-300 hover:scale-110 active:scale-75 transition-all duration-300 font-medium rounded-lg text-sm px-8 h-[3rem] mr-2"
              onClick={(e) => updateDescription(e)}
            >
              Edit
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}

export default EditTodo;
