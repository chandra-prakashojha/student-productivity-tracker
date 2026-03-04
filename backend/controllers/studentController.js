const studentService = require("../services/studentService");
const asyncHandler = require("../middleware/asyncHandler");


// Create Student
exports.createStudent = asyncHandler(async (req, res) => {

  const student = await studentService.createStudentService(req.body);

  res.status(201).json({
    message: "Student created successfully",
    student
  });

});



// Get Students
exports.getStudents = asyncHandler(async (req, res) => {

  const students = await studentService.getStudentsService();

  res.json({
    message: "Students fetched successfully",
    students
  });

});



// Update Student
exports.updateStudent = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const student = await studentService.updateStudentService(id, req.body);

  res.json({
    message: "Student updated successfully",
    student
  });

});