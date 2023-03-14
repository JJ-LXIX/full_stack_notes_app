import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

function InputTodo() {
  const [description, setDescription] = useState("");
  const router = useRouter();

  async function formSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (description === "") return;
    try {
      const body = { description };
      const response = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="w-full flex flex-col justify-around items-center  h-32">
      <h1 className="text-3xl font-bold">Full Stack Todo List</h1>
      <form className="flex gap-5" onSubmit={formSubmit}>
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
