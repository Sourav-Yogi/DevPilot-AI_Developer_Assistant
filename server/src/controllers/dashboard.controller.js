import History from "../models/History.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const history = await History.find({ user: userId });

    const codeReviews = history.filter(
      (item) => item.feature === "code-review"
    ).length;

    const readmes = history.filter(
      (item) => item.feature === "readme-generator"
    ).length;

    const unitTests = history.filter(
      (item) => item.feature === "unit-test-generator"
    ).length;

    const recentActivity = await History.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        codeReviews,
        readmes,
        unitTests,
        history: history.length,
        recentActivity,
      },
    });
  } catch (error) {
    next(error);
  }
};