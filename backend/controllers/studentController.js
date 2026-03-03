const { ObjectId } = require("mongodb");
const { getCollection } = require("../config/db");
const asyncHandler = require("../middleware/asyncHandler");

// CREATE STUDENT
const createStudent = asyncHandler(async (req, res) => {
  const students = getCollection("students");
  const { name, role } = req.body;

  if (!name || !role) {
    const error = new Error("Name and role are required");
    error.status = 400;
    throw error;
  }

  const result = await students.insertOne({
    name,
    role,
    createdAt: new Date(),
    createdBy: new ObjectId(req.user.id),
  });

  res.status(201).json({
    message: "Student created successfully",
    id: result.insertedId,
  });
});

// GET ALL STUDENTS (ONLY LOGGED USER)
const getStudents = asyncHandler(async (req, res) => {
  const students = getCollection("students");

  const data = await students
    .find({ createdBy: new ObjectId(req.user.id) })
    .toArray();

  res.json(data);
});

// GET SINGLE STUDENT
const getStudentById = asyncHandler(async (req, res) => {
  const students = getCollection("students");
  const { id } = req.params;

  const student = await students.findOne({
    _id: new ObjectId(id),
    createdBy: new ObjectId(req.user.id),
  });

  if (!student) {
    const error = new Error("Student not found or not authorized");
    error.status = 404;
    throw error;
  }

  res.json(student);
});

// UPDATE STUDENT
const updateStudent = asyncHandler(async (req, res) => {
  const students = getCollection("students");
  const { id } = req.params;
  const { name, role } = req.body;

  const result = await students.updateOne(
    {
      _id: new ObjectId(id),
      createdBy: new ObjectId(req.user.id),
    },
    {
      $set: { name, role },
    }
  );

  if (result.matchedCount === 0) {
    const error = new Error("Student not found or not authorized");
    error.status = 404;
    throw error;
  }

  res.json({ message: "Student updated successfully" });
});

// DELETE STUDENT
const deleteStudent = asyncHandler(async (req, res) => {
  const students = getCollection("students");
  const { id } = req.params;

  const result = await students.deleteOne({
    _id: new ObjectId(id),
    createdBy: new ObjectId(req.user.id),
  });

  if (result.deletedCount === 0) {
    const error = new Error("Student not found or not authorized");
    error.status = 404;
    throw error;
  }

  res.json({ message: "Student deleted successfully" });
});

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};