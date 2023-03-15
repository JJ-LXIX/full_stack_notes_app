import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import { FaTrash } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

function ListTodo() {
  type DATA = [
    {
      todo_id: string;
      description: string;
    }
  ];

  type loopTodo = { todo_id: string; description: string };

  const [todos, setTodos] = useState<DATA>();

  // Fetch all todos
  async function getTodos() {
    let { data, error } = await supabase.from("todo").select("*");

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setTodos(data as any);
    }
  }
  // async function getTodos() {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/todos");
  //     const data = await response.json();
  //     setTodos(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // Delete todos
  async function deleteTodos(id: string) {
    const { data, error } = await supabase
      .from("todo")
      .delete()
      .eq("todo_id", `${id}`);
    const newData: any = todos?.filter((todo): any => todo.todo_id !== id);
    setTodos(newData);

    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTodos();
    // console.log(todos);
  }, []);

  return (
    <div
      className="w-full  min-h-[75vh] flex flex-col  justify-start items-center mt-10 
    lg:grid lg:grid-cols-2 lg:justify-items-center lg:gap-y-8 
    xl:grid-cols-4 xl:w-[75%]  xl:mx-auto place-content-start"
    >
      {todos?.map((todo: loopTodo) => {
        return (
          <div
            key={todo.todo_id}
            className="h-44 w-[85%] bg-purple-800 border-2 border-purple-400 shadow-lg  shadow-purple-400 rounded-lg mb-10 lg:mb-6 
            flex justify-between lg:w-[90%] xl:w-[85%] xl:h-72 xl:flex-col p-2"
          >
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white px-2 pt-4 ">
              {todo.description.slice(0, 1).toUpperCase() +
                todo.description.slice(1)}
            </h2>
            <div className="flex  justify-around items-end xl:items-start xl:justify-end ">
              <EditTodo todo={todo} />
              <button
                onClick={() => deleteTodos(todo.todo_id)}
                className="max-w-sm  text-white bg-red-700 hover:bg-red-900 shadow-neon focus:ring-red-300 hover:scale-110 active:scale-75 transition-all duration-300 font-medium rounded-lg text-sm px-4 py-3 mr-2"
              >
                <FaTrash className="" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListTodo;
