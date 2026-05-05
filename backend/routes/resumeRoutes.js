const express = require("express");
const multer = require("multer");

const router = express.Router();

const { analyzeResume } = require("../controllers/resumeController");
const { protect } = require("../middleware/authMiddleware");

const validate = require("../middleware/validate");
const limiter = require("../middleware/rateLimiter");

const { resumeSchema } = require("../validation/resumeValidation");

const upload = multer({
  dest: "uploads/"
});

router.post(
  "/analyze",
  limiter,                 // Rate limit
  protect,                 // Auth
  upload.single("resume"), // File upload
  validate(resumeSchema),  // Joi validation
  analyzeResume            // Controller
);

module.exports = router;