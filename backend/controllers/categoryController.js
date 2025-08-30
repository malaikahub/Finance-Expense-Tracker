// controllers/categoryController.js
import pool from "../config/db.js";

export const getCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body; // type: income/expense
    const result = await pool.query(
      "INSERT INTO categories(name, type) VALUES($1,$2) RETURNING *",
      [name, type]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
