const express = require("express");
const cors = require("cors");
const feedbackRoutes = require("./routes/feedback");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ✅ Allowed frontend origin(s)
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "https://hrrequesstandfeebdack.vercel.app" // your deployed frontend
];

// ✅ Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/feedback", feedbackRoutes);

// ✅ Health check route
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// ✅ Global error handler
app.use(errorHandler);

module.exports = app;
