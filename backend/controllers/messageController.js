// controllers/messageController.js
import pool from "../config/db.js";

export const getMessages = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const createMessage = async (req, res) => {
  try {
    const { sender_id, receiver_id, content, date } = req.body;
    const result = await pool.query(
      "INSERT INTO messages(sender_id, receiver_id, content, date) VALUES($1,$2,$3,$4) RETURNING *",
      [sender_id, receiver_id, content, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
