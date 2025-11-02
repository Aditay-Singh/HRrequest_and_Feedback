const express = require("express");
const cors = require("cors");
const feedbackRoutes = require("./routes/feedback");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/feedback", feedbackRoutes);

// ✅ Health Check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// ✅ Global Error Handler
app.use(errorHandler);

module.exports = app;
