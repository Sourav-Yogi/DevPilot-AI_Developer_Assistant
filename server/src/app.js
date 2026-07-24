import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import historyRoutes from "./routes/history.routes.js";
// import aiRoutes from "./routes/ai.routes.js";
import projectRoutes from "./routes/project.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DevPilot API Running 🚀",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/history", historyRoutes);

// app.use("/api/ai", aiRoutes);
app.use("/api/projects", projectRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;