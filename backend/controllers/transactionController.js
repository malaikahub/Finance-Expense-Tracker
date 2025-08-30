// controllers/transactionController.js
import pool from "../config/db.js";

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM transactions");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create a transaction
export const createTransaction = async (req, res) => {
  try {
    const { user_id, amount, type, category_id, date } = req.body;
    const result = await pool.query(
      "INSERT INTO transactions(user_id, amount, type, category_id, date) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [user_id, amount, type, category_id, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update a transaction
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, type, category_id, date } = req.body;
    const result = await pool.query(
      "UPDATE transactions SET amount=$1, type=$2, category_id=$3, date=$4 WHERE id=$5 RETURNING *",
      [amount, type, category_id, date, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// DELETE a transaction ✅
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM transactions WHERE id=$1", [id]);
    res.json({ msg: "Transaction deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
