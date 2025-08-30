import express from "express";
import { getGoals, getGoalById, createGoal, updateGoal, deleteGoal } from "../controllers/goalController.js";

const router = express.Router();

router.get("/", getGoals);
router.get("/:id", getGoalById);
router.post("/", createGoal);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

export default router;
