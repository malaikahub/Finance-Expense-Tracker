import pool from "../config/db.js"; // your PostgreSQL pool

export const getAccounts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM accounts");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM accounts WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Account not found" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAccount = async (req, res) => {
  try {
    const { name, balance } = req.body;
    const result = await pool.query(
      "INSERT INTO accounts (name, balance) VALUES ($1, $2) RETURNING *",
      [name, balance]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, balance } = req.body;
    const result = await pool.query(
      "UPDATE accounts SET name = $1, balance = $2 WHERE id = $3 RETURNING *",
      [name, balance, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Account not found" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM accounts WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Account not found" });
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
