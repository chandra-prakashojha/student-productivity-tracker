const Application = require("../models/Application");


// Create Application
exports.createApplicationService = async (data) => {

  const application = await Application.create(data);

  return application;
};



// Get Applications (Search + Filter + Pagination)
exports.getApplicationsService = async (query) => {

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  const skip = (page - 1) * limit;

  let filter = {};

  // filter by status
  if (query.status) {
    filter.status = query.status;
  }

  // search by company
  if (query.search) {
    filter.company = { $regex: query.search, $options: "i" };
  }

  const total = await Application.countDocuments(filter);

  const applications = await Application.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    page,
    limit,
    total,
    applications
  };
};



// Update Application Status
exports.updateApplicationStatusService = async (id, status) => {

  const application = await Application.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!application) {
    throw new Error("Application not found");
  }

  return application;
};



// Delete Application
exports.deleteApplicationService = async (id) => {

  const application = await Application.findByIdAndDelete(id);

  if (!application) {
    throw new Error("Application not found");
  }

  return application;
};