const express = require("express");
const router = express.Router();

const {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getRecentApplications
} = require("../controllers/applicationController");

router.get("/recent", getRecentApplications);

router.get("/", getApplications);

router.post("/", createApplication);

router.put("/:id", updateApplication);

router.delete("/:id", deleteApplication);

module.exports = router;