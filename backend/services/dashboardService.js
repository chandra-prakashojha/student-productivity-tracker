const Student = require("../models/Student");
const Application = require("../models/Application");

exports.getDashboardStats = async (userId) => {
  const totalStudents = await Student.countDocuments({
    createdBy: userId,
  });

  const totalApplications = await Application.countDocuments({
    createdBy: userId,
  });

  const interviews = await Application.countDocuments({
    createdBy: userId,
    status: "INTERVIEW",
  });

  const offers = await Application.countDocuments({
    createdBy: userId,
    status: "OFFER",
  });

  const rejections = await Application.countDocuments({
    createdBy: userId,
    status: "REJECTED",
  });

  const applicationsByStatus = await Application.aggregate([
    {
      $match: { createdBy: userId },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        status: "$_id",
        count: 1,
        _id: 0,
      },
    },
  ]);

  return {
    totalStudents,
    totalApplications,
    interviews,
    offers,
    rejections,
    applicationsByStatus,
  };
};