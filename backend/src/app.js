const express = require("express");
const cors = require("cors");
const feedbackRoutes = require("./routes/feedback");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ✅ Allowed frontend origins (both local + deployed)
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "https://hrrequesstandfeebdack.vercel.app", // your frontend (Vercel)
];

// ✅ CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked CORS for:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/feedback", feedbackRoutes);

// ✅ Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", time: new Date().toISOString() });
});

// ✅ Error handler
app.use(errorHandler);

module.exports = app;
