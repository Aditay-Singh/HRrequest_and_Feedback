// backend/src/routes/index.js
const express = require('express');
const router = express.Router();
const feedbackRoutes = require('./feedback');

// Mount routes
router.use('/feedback', feedbackRoutes);

module.exports = router;