// controllers/goalController.js
import pool from "../config/db.js";

export const getGoals = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM goals");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const createGoal = async (req, res) => {
  try {
    const { user_id, title, target_amount } = req.body;
    const result = await pool.query(
      "INSERT INTO goals(user_id, title, target_amount) VALUES($1,$2,$3) RETURNING *",
      [user_id, title, target_amount]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
