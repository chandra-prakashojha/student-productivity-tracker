const Student = require("../models/Student");


// Create Student
exports.createStudentService = async (data) => {

  const student = await Student.create(data);

  return student;
};



// Get Students
exports.getStudentsService = async () => {

  const students = await Student.find().sort({ createdAt: -1 });

  return students;
};



// Update Student
exports.updateStudentService = async (id, data) => {

  const student = await Student.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
};