const express = require("express");

const {
  getDashboardStats,
  getApplicationTrend,
  getUpcomingInterviews
} = require("../controllers/dashboardController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Protect dashboard routes
router.get("/", protect, getDashboardStats);
router.get("/trend", protect, getApplicationTrend);
router.get("/upcoming-interviews", protect, getUpcomingInterviews);

module.exports = router;