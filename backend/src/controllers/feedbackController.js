// backend/src/controllers/feedbackController.js
const Feedback = require("../models/Feedback");
const emailService = require("../services/emailService");
const { generateToken } = require("../utils/helpers");

class FeedbackController {
  // ===========================
  // 1️⃣ Send feedback request
  // ===========================
  async sendFeedbackRequest(req, res) {
    try {
      const { userEmail, hrEmail } = req.body;

      // Validate emails
      if (!userEmail || !hrEmail) {
        return res.status(400).json({
          success: false,
          message: "Both user email and HR email are required",
        });
      }

      // Prevent same user & HR email
      if (userEmail === hrEmail) {
        return res.status(400).json({
          success: false,
          message: "User email and HR email must be different",
        });
      }

      // Generate unique token
      const token = generateToken();

      // Create feedback record with status = 'pending'
      const feedback = await Feedback.create({
        userEmail,
        hrEmail,
        token,
        status: "pending",
        createdAt: new Date(),
      });

      // Send email to user (with feedback form link)
      await emailService.sendFeedbackRequest(userEmail, token);

      res.status(201).json({
        success: true,
        message: `Feedback request sent successfully to ${userEmail}`,
        data: {
          id: feedback._id,
          userEmail: feedback.userEmail,
          hrEmail: feedback.hrEmail,
          status: feedback.status,
        },
      });
    } catch (error) {
      console.error("Error sending feedback request:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send feedback request",
        error: error.message,
      });
    }
  }

  // ===========================
  // 2️⃣ Submit feedback
  // ===========================
  async submitFeedback(req, res) {
    try {
      const { token } = req.params;
      const { rating, message } = req.body;

      // Validate input
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5",
        });
      }

      const feedback = await Feedback.findOne({ token });

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: "Feedback request not found",
        });
      }

      // Check if already submitted
      if (feedback.status === "submitted") {
        return res.status(400).json({
          success: false,
          message: "Feedback already submitted",
        });
      }

      // Check if expired
      if (feedback.expiresAt && new Date() > feedback.expiresAt) {
        return res.status(400).json({
          success: false,
          message: "Feedback request has expired",
        });
      }

      // Update feedback document
      feedback.rating = rating;
      feedback.message = message;
      feedback.status = "submitted";
      feedback.submittedAt = new Date();

      await feedback.save();

      // Send HR & Thank-you emails
      await Promise.all([
        emailService.sendHRConfirmation(feedback.hrEmail, feedback.userEmail, {
          rating,
          message,
        }),
        emailService.sendThankYouEmail(feedback.userEmail),
      ]);

      res.json({
        success: true,
        message: "Feedback submitted successfully",
        data: {
          status: feedback.status,
          submittedAt: feedback.submittedAt,
        },
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      res.status(500).json({
        success: false,
        message: "Failed to submit feedback",
        error: error.message,
      });
    }
  }

  // ===========================
  // 3️⃣ Get all feedback (for dashboard)
  // ===========================
  async getAllFeedback(req, res) {
    try {
      const { status, page = 1, limit = 10 } = req.query;

      const query = {};
      if (status) query.status = status;

      const feedbacks = await Feedback.find(query)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .select("-__v");

      const count = await Feedback.countDocuments(query);

      res.json({
        success: true,
        data: feedbacks,
        pagination: {
          total: count,
          page: parseInt(page),
          pages: Math.ceil(count / limit),
        },
      });
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch feedback",
        error: error.message,
      });
    }
  }
  async getFeedbackByToken(req, res) {
  try {
    const { token } = req.params;
    const feedback = await Feedback.findOne({ token });

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found for this token",
      });
    }

    res.json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.error("Error fetching feedback by token:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback by token",
      error: error.message,
    });
  }
}


  // ===========================
  // 4️⃣ Get feedback statistics
  // ===========================
  async getStatistics(req, res) {
    try {
      const [total, pending, submitted, avgRating] = await Promise.all([
        Feedback.countDocuments(),
        Feedback.countDocuments({ status: "pending" }),
        Feedback.countDocuments({ status: "submitted" }),
        Feedback.aggregate([
          { $match: { status: "submitted", rating: { $exists: true } } },
          { $group: { _id: null, avgRating: { $avg: "$rating" } } },
        ]),
      ]);

      res.json({
        success: true,
        data: {
          total,
          pending,
          submitted,
          averageRating: avgRating[0]?.avgRating?.toFixed(2) || 0,
        },
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch statistics",
        error: error.message,
      });
    }
  }
}

module.exports = new FeedbackController();
