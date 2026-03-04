const express = require("express");
const router = express.Router();

const {
  createApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");


router.post("/", protect, createApplication);

router.get("/", protect, getApplications);

router.patch("/:id/status", protect, updateApplicationStatus);

router.delete("/:id", protect, deleteApplication);


module.exports = router;