const express = require("express");
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createStudent);
router.get("/", protect, getStudents);
router.get("/:id", protect, getStudentById);
router.put("/:id", protect, updateStudent);

// 🔥 only admin can delete
router.delete("/:id", protect, adminOnly, deleteStudent);

module.exports = router;