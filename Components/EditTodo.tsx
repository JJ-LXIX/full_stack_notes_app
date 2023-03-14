import { useRouter } from "next/router";
import { useState } from "react";

function EditTodo({ todo }: any) {
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [description, setDescription] = useState(todo.description);
  const router = useRouter();

  async function updateDescription(e: any) {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:3000/api/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      (window as Window).location = "/";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setOpenModal(true);
          setDescription(todo.description);
        }}
      >
        EDIT
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
