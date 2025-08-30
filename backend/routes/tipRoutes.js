import express from "express";
import { getTips, getTipById, createTip, updateTip, deleteTip } from "../controllers/tipController.js";

const router = express.Router();

router.get("/", getTips);
router.get("/:id", getTipById);
router.post("/", createTip);
router.put("/:id", updateTip);
router.delete("/:id", deleteTip);

export default router;
