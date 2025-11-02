// backend/src/routes/feedback.js
const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/send-request", feedbackController.sendFeedbackRequest);
router.get("/", feedbackController.getAllFeedback);
router.get("/stats/summary", feedbackController.getStatistics);
router.get("/:token", feedbackController.getFeedbackByToken);
router.post("/:token/submit", feedbackController.submitFeedback);

module.exports = router;
