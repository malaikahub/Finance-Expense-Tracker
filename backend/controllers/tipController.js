// controllers/tipController.js
import pool from "../config/db.js";

export const getTips = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tips");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const createTip = async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await pool.query(
      "INSERT INTO tips(title, description) VALUES($1,$2) RETURNING *",
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
