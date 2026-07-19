import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  reviewCode,
  generateReadme,
  generateUnitTests,
} from "../controllers/ai.controller.js";

const router = express.Router();

router.use(protect);

router.post("/review", reviewCode);

router.post("/readme", generateReadme);

router.post("/unit-test", generateUnitTests);

export default router;