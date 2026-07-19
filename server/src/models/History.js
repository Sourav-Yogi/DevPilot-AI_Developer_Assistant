import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    feature: {
      type: String,
      required: true,
      enum: ["code-review", "readme-generator", "unit-test-generator"],
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
      default: "",
      trim: true,
    },

    input: {
      type: String,
      required: true,
    },

    output: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model("History", historySchema);

export default History;