import History from "../models/History.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getHistory = asyncHandler(async (req, res) => {
  const history = await History.find({
    user: req.user._id,
  }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: history.length,
    data: history,
  });
});

export const getHistoryById = asyncHandler(async (req, res) => {
  const history = await History.findById(req.params.id);

  if (!history) {
    res.status(404);
    throw new Error("History not found");
  }

  if (history.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized");
  }

  res.status(200).json({
    success: true,
    data: history,
  });
});

export const deleteHistory = asyncHandler(async (req, res) => {
  const history = await History.findById(req.params.id);

  if (!history) {
    res.status(404);
    throw new Error("History not found");
  }

  if (history.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Unauthorized");
  }

  await history.deleteOne();

  res.status(200).json({
    success: true,
    message: "History deleted successfully",
  });
});