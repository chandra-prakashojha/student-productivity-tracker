const Application = require("../models/Application");
const Student = require("../models/Student");


/*
# DASHBOARD STATS
*/
exports.getDashboardStats = async (req, res) => {
  try {

    let query = {};

    if (req.user.role !== "admin") {
      query.userId = req.user.id;
    }

    const students = req.user.role === "admin"
      ? await Student.countDocuments()
      : 1;

    const applications = await Application.countDocuments(query);

    const interviews = await Application.countDocuments({
      ...query,
      status: "Interview"
    });

    const offers = await Application.countDocuments({
      ...query,
      status: "Offer"
    });

    const rejected = await Application.countDocuments({
      ...query,
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

    console.log("DASHBOARD ERROR:", err);

    res.status(500).json({
      message: err.message
    });

  }
};


/*
# APPLICATION TREND
*/
exports.getApplicationTrend = async (req, res) => {
  try {

    let query = {};

    if (req.user.role !== "admin") {
      query.userId = req.user.id;
    }

    const applications = await Application.find(query);

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const monthCount = {};

    applications.forEach(app => {
      const date = new Date(app.createdAt || app.appliedDate || Date.now());
      const month = months[date.getMonth()];

      monthCount[month] = (monthCount[month] || 0) + 1;
    });

    const formatted = Object.keys(monthCount).map(month => ({
      month,
      applications: monthCount[month]
    }));

    res.json(formatted);

  } catch (err) {
    console.error("TREND ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
// @desc    Get upcoming interviews (next 7 days)
// @route   GET /api/dashboard/upcoming-interviews
// @access  Private
// @desc    Get upcoming interviews (next 7 days)
// @route   GET /api/dashboard/upcoming-interviews
// @access  Private
// @desc Get upcoming interviews (next 7 days)
exports.getUpcomingInterviews = async (req, res) => {
  try {

    const today = new Date();
    today.setHours(0,0,0,0);

    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    nextWeek.setHours(23,59,59,999);

    let query = {};

    if (req.user.role !== "admin") {
      query.userId = req.user.id;
    }

    const applications = await Application.find(query)
      .populate("companyId","name");

    const upcoming = [];

    applications.forEach(app => {

      if(!app.interviewRounds) return;

      app.interviewRounds.forEach(round => {

        const roundDate = new Date(round.date);

        if(roundDate >= today && roundDate <= nextWeek){

          upcoming.push({
            companyName: app.companyId?.name || "Unknown",
            role: app.role,
            roundName: round.roundName,
            date: round.date,
            status: round.status
          });

        }

      });

    });

    upcoming.sort((a,b)=> new Date(a.date) - new Date(b.date));

    res.json(upcoming);

  } catch(err){

    console.error("UPCOMING INTERVIEW ERROR:",err);
    res.status(500).json({message:err.message});

  }
};