import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../db/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id,
      ]);
      res.json(todo.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }

  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE todo SET description =$1 WHERE todo_id = $2",
        [description, id]
      );
      res.json("TODO was updated!");
    } catch (err) {
      console.log(err);
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const deleteTodo = await pool.query(
        "DELETE FROM todo WHERE todo_id = $1",
        [id]
      );
      res.json("Todo was DELETED!");
    } catch (err) {
      console.log(err);
    }
  }
}
