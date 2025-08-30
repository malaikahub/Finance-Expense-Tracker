// controllers/budgetController.js
import pool from "../config/db.js";

export const getBudgets = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM budgets");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const createBudget = async (req, res) => {
  try {
    const { user_id, category_id, amount, month } = req.body;
    const result = await pool.query(
      "INSERT INTO budgets(user_id, category_id, amount, month) VALUES($1,$2,$3,$4) RETURNING *",
      [user_id, category_id, amount, month]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
