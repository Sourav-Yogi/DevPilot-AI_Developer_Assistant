import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
  createProject,
  getProjects,
  getProjectById,
  chatWithProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.use(protect);
router.post(
  "/",
  upload.single("repositoryZip"),
  createProject
);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/:id/chat", chatWithProject);

export default router;