// backend/src/models/Feedback.js
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    hrEmail: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    rating: { type: Number },
    message: { type: String },
    status: {
      type: String,
      enum: ["pending", "submitted"],
      default: "pending",
    },
    submittedAt: { type: Date },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from creation
    },
  },
  { timestamps: true }
);

// ✅ Optional: Ensure no duplicate index warnings for "token"
feedbackSchema.index({ token: 1 }, { unique: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
