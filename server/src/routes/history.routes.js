import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  getHistory,
  getHistoryById,
  deleteHistory,
} from "../controllers/history.controller.js";

const router = express.Router();

router.use(protect);

router.get("/", getHistory);

router.get("/:id", getHistoryById);

router.delete("/:id", deleteHistory);

export default router;