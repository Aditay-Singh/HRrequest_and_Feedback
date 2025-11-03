require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");

// ✅ Connect to MongoDB
connectDB();

// ✅ Start Express Server
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("✅ HR Feedback & Request backend is running successfully!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`📧 Email: ${process.env.RESEND_API_KEY ? "Configured" : "Not configured"}`);
  console.log(`🗄️ DB: ${process.env.MONGODB_URI ? "Connected" : "Not configured"}`);
});
