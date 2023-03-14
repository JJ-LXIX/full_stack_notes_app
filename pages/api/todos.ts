import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../db/db";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { description } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1)",
        [description]
      );
      res.json(newTodo);
    } catch (err) {
      console.log(err);
    }
  }
}
