const express = require("express");

const {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getRecentApplications,
  getApplicationById,
  addInterviewRound,
  getCompanyAnalytics
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getApplications);

router.post("/", protect, createApplication);

router.put("/:id", protect, updateApplication);

router.delete("/:id", protect, deleteApplication);

router.get("/recent", protect, getRecentApplications);

router.get("/:id", protect, getApplicationById);

router.post("/:id/interview-round", protect, addInterviewRound);

router.get("/analytics/company", protect, getCompanyAnalytics);

module.exports = router;