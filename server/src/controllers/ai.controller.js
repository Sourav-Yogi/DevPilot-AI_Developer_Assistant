import asyncHandler from "../utils/asyncHandler.js";
import {
  reviewCodeService,
  generateReadmeService,
  generateUnitTestService,
} from "../services/gemini.service.js";



export const reviewCode = asyncHandler(async (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    res.status(400);
    throw new Error("Language and code are required");
  }

  const result = await reviewCodeService({
    userId: req.user._id,
    language,
    code,
  });

  res.status(200).json({
    success: true,
    message: "Code reviewed successfully",
    data: result,
  });
});

export const generateReadme = asyncHandler(async (req, res) => {
  const {
    projectName,
    description,
    techStack,
    features,
  } = req.body;

  if (!projectName || !description) {
    res.status(400);
    throw new Error("Project name and description are required");
  }

  const markdown = await generateReadmeService({
    userId: req.user._id,
    projectName,
    description,
    techStack,
    features,
  });

  res.status(200).json({
    success: true,
    message: "README generated successfully",
    data: {
      markdown,
    },
  });
});

export const generateUnitTests = asyncHandler(async (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    res.status(400);
    throw new Error("Language and code are required");
  }

  const tests = await generateUnitTestService({
    userId: req.user._id,
    language,
    code,
  });

  res.status(200).json({
    success: true,
    message: "Unit tests generated successfully",
    data: {
      tests,
    },
  });
});