const Application = require("../models/Application");
const Student = require("../models/Student");


// ================= DASHBOARD STATS =================

exports.getDashboardStats = async (req, res) => {

  try {

    const students = await Student.countDocuments();

    const applications = await Application.countDocuments();

    const interviews = await Application.countDocuments({
      status: "Interview"
    });

    const offers = await Application.countDocuments({
      status: "Offer"
    });

    const rejected = await Application.countDocuments({
      status: "Rejected"
    });

    res.json({
      students,
      applications,
      interviews,
      offers,
      rejected
    });

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

};



// ================= APPLICATION TREND =================

exports.getApplicationTrend = async (req, res) => {

  try {

    const trend = await Application.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const formatted = trend.map(item => ({
      month: months[item._id - 1],
      applications: item.count
    }));

    res.json(formatted);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

};