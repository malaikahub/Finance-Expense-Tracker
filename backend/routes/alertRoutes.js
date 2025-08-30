import express from "express";
import {
  createAlert,
  getAlerts,
  updateAlert,
  deleteAlert
} from "../controllers/alertController.js";

const router = express.Router();

router.post("/", createAlert);
router.get("/", getAlerts);
router.put("/:id", updateAlert);
router.delete("/:id", deleteAlert);

export default router;
