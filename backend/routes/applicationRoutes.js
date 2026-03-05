const express = require("express");
const router = express.Router();

const {
  getApplications,
  createApplication,
  deleteApplication,
  getRecentApplications
} = require("../controllers/applicationController");

router.get("/recent", getRecentApplications);
router.get("/", getApplications);
router.post("/", createApplication);
router.delete("/:id", deleteApplication);

module.exports = router;