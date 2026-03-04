const express = require("express");
const router = express.Router();

const {
  createStudent,
  getStudents,
  updateStudent
} = require("../controllers/studentController");

const { protect } = require("../middleware/authMiddleware");


router.post("/", protect, createStudent);

router.get("/", protect, getStudents);

router.put("/:id", protect, updateStudent);


module.exports = router;