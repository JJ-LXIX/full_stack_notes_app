import { useEffect, useState } from "react";

function ListTodo() {
  const [todos, setTodos] = useState([]);
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
  }, []);

  return <div className="w-full  h-[75vh]"></div>;
}

export default ListTodo;
