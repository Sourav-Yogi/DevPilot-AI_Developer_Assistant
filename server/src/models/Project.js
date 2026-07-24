import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    repositoryType: {
      type: String,
      enum: ["github", "zip"],
      required: true,
    },

    githubUrl: {
      type: String,
      default: null,
    },

    localPath: {
      type: String,
      default: null,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    aiProjectId: {
      type: String,
      required: true,
      unique: true,
    },

    indexed: {
      type: Boolean,
      default: false,
    },

    indexingStatus: {
      type: String,
      enum: ["pending", "indexing", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);