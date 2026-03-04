const applicationService = require("../services/applicationService");
const asyncHandler = require("../middleware/asyncHandler");


// Create Application
exports.createApplication = asyncHandler(async (req, res) => {

  const application = await applicationService.createApplicationService(req.body);

  res.status(201).json({
    message: "Application created successfully",
    application
  });

});



// Get Applications
exports.getApplications = asyncHandler(async (req, res) => {

  const result = await applicationService.getApplicationsService(req.query);

  res.json({
    message: "Applications fetched successfully",
    ...result
  });

});



// Update Application Status
exports.updateApplicationStatus = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const { status } = req.body;

  const application = await applicationService.updateApplicationStatusService(id, status);

  res.json({
    message: "Application status updated successfully",
    application
  });

});



// Delete Application
exports.deleteApplication = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const application = await applicationService.deleteApplicationService(id);

  res.json({
    message: "Application deleted successfully",
    application
  });

});