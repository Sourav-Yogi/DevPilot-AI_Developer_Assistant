import crypto from "crypto";
import path from "path";
import Project from "../models/Project.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  indexRepository,
  chatWithRepository,
} from "../services/ai.service.js";

import {
  extractRepositoryZip,
} from "../services/repository.service.js";

/**
 * Background indexing
 */

const startIndexing = async (project) => {
  try {
    const absolutePath = project.localPath
      ? path.resolve(project.localPath)
      : null;

    await indexRepository({
      githubUrl: project.githubUrl,
      localPath: absolutePath,
      projectId: project.aiProjectId,
    });

    project.indexed = true;
    project.indexingStatus = "completed";
    await project.save();
  } catch (error) {
    console.error(error);

    project.indexed = false;
    project.indexingStatus = "failed";
    await project.save();
  }
};

/**
 * @desc Create Project
 * @route POST /api/projects
 */
export const createProject = asyncHandler(async (req, res) => {
  const { name, githubUrl } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Project name is required.");
  }

  if (!githubUrl && !req.file) {
    res.status(400);
    throw new Error("Provide either a GitHub URL or ZIP file.");
  }

  let repositoryType = "github";
  let localPath = null;

  if (req.file) {
    repositoryType = "zip";

    localPath = await extractRepositoryZip(
      req.file.path,
      crypto.randomUUID()
    );
  }

  const project = await Project.create({
    name,
    repositoryType,
    githubUrl: githubUrl || null,
    localPath,
    owner: req.user._id,
    aiProjectId: crypto.randomUUID(),
    indexed: false,
    indexingStatus: "indexing",
  });

  startIndexing(project);

  res.status(201).json({
    success: true,
    message: "Project created successfully.",
    data: project,
  });
});

/**
 * @desc Get all projects
 * @route GET /api/projects
 */
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    owner: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

/**
 * @desc Get single project
 * @route GET /api/projects/:id
 */
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found.");
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized.");
  }

  res.status(200).json({
    success: true,
    data: project,
  });
});

/**
 * @desc Chat with repository
 * @route POST /api/projects/:id/chat
 */
export const chatWithProject = asyncHandler(async (req, res) => {
  const { question, history = [] } = req.body;

  if (!question) {
    res.status(400);
    throw new Error("Question is required.");
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found.");
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized.");
  }

  if (!project.indexed) {
    res.status(400);
    throw new Error("Repository is still indexing.");
  }

const response = await chatWithRepository(
  project.aiProjectId,
  question,
  history
);

  res.status(200).json({
    success: true,
    data: response,
  });
});