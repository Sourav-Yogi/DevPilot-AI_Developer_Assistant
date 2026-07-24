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

// Create project (GitHub or ZIP)
router.post(
  "/",
  upload.single("repositoryZip"),
  createProject
);

// Get all projects
router.get("/", getProjects);

// Get single project
router.get("/:id", getProjectById);

// Chat with repository
router.post("/:id/chat", chatWithProject);

export default router;