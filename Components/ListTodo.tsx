"use client ";
import { useEffect, useState } from "react";

function ListTodo() {
  const arr = [1, 2, 3, 4];
  type DATA = [
    {
      todo_id: string;
      description: string;
    }
  ];

  type loopTodo = { todo_id: string; description: string };

  const [todos, setTodos] = useState<DATA>();
  async function getTodos() {
    try {
      const response = await fetch("http://localhost:3000/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTodos();
    // console.log(todos);
  }, []);

  return (
    <div className="w-full  h-[75vh]">
      <table className="w-full border border-seperate">
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
              <tr>
                <td className=" p-2 ">{todo.description}</td>
                <td className=" p-2 text-center">EDIT</td>
                <td className=" p-2 text-center">DELETE</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div></div>
      {/* <p>{todos[0].description}</p> */}
    </div>
  );
}

export default ListTodo;
