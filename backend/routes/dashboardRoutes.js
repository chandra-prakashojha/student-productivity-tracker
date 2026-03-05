const express = require("express");

const {
  getDashboardStats,
  getApplicationTrend
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", getDashboardStats);

router.get("/trend", getApplicationTrend);

module.exports = router;