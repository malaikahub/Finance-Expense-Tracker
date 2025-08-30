import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js"; // Use pg Pool instead of connectDB

// Import all routes
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import tipRoutes from "./routes/tipRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tips", tipRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/budgets", budgetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
