"use client ";
import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

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
    try {
      const response = await fetch("http://localhost:3000/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  }

  // Delete todos
  async function deleteTodos(id: string) {
    try {
      const deleteTodo = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
      });
      const newData: any = todos?.filter((todo): any => todo.todo_id !== id);
      setTodos(newData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTodos();
    // console.log(todos);
  }, []);

  return (
    <div className="w-full  h-[75vh] flex flex-col justify-start items-center mt-10">
      {/* <table className="w-full border border-seperate">
        <thead>
          <tr>
            <th>DESCRIPTION</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="border">
          {todos?.map((todo: loopTodo) => {
            // console.log(i, todo["description"]);
            return (
              <tr key={todo.todo_id}>
                <td className=" p-2 ">{todo.description}</td>
                <td className=" p-2 text-center">
                  <EditTodo todo={todo} />
                </td>
                <td className=" p-2 text-center">
                  <button onClick={() => deleteTodos(todo.todo_id)}>
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> */}

      {todos?.map((todo: loopTodo) => {
        console.log(todo);
        return (
          <div
            key={todo.todo_id}
            className="h-44 w-10/12 bg-white/90 rounded-lg mb-5 flex justify-between "
          >
            <h2 className="text-2xl font-semibold text-zinc-900 pl-4 pt-10 ">
              {todo.description.toUpperCase()}
            </h2>
            <div className="flex flex-col justify-between items-center px-2 py-5">
              <EditTodo todo={todo} />
              <button
                onClick={() => deleteTodos(todo.todo_id)}
                className="max-w-sm focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                DELETE
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListTodo;
