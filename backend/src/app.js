const express = require("express");
const cors = require("cors");
const feedbackRoutes = require("./routes/feedback");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ✅ CORS Configuration
const allowedOrigins = [
  "https://hrrequesstandfeebdack.vercel.app", // ✅ Your deployed frontend
  "http://localhost:3000"                     // ✅ Local development
];

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

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use("/api/feedback", feedbackRoutes);

// ✅ Health Check Route
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// ✅ Global Error Handler
app.use(errorHandler);

module.exports = app;
