const express = require("express");
const multer = require("multer");

const { analyzeResume } = require("../controllers/resumeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const upload = multer({
  dest: "uploads/"
});

router.post(
  "/analyze",
  protect,
  upload.single("resume"),
  analyzeResume
);

module.exports = router;