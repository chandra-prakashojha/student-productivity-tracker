const dashboardService = require("../services/dashboardService");
const asyncHandler = require("../middleware/asyncHandler");

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getDashboardStats(req.user.id);

  res.json({
    message: "Dashboard stats fetched successfully",
    stats,
  });
});