const Application = require("../models/Application");
const Company = require("../models/Company");

 /*

# GET APPLICATIONS

*/
exports.getApplications = async (req, res) => {

try {


const applications = await Application
  .find()
  .populate("companyId")
  .sort({ createdAt: -1 });

res.json({ applications });


} catch (err) {


console.error(err);
res.status(500).json({ message: "Server error" });


}

};

 /*

# CREATE APPLICATION

*/
exports.createApplication = async (req, res) => {

try {


const { companyId, role, status } = req.body;

if (!companyId || !role) {

  return res.status(400).json({
    message: "Company and role required"
  });

}

const application = new Application({
  companyId,
  role,
  status
});

const saved = await application.save();

const populated =
  await saved.populate("companyId");

res.status(201).json(populated);


} catch (err) {


console.error(err);
res.status(500).json({ message: "Server error" });


}

};

 /*

# UPDATE APPLICATION

*/
exports.updateApplication = async (req, res) => {

try {

let { companyId, role, status, notes } = req.body;

/* Fix populated object issue */
if (typeof companyId === "object" && companyId !== null) {
  companyId = companyId._id;
}

const updatedApplication =
  await Application.findByIdAndUpdate(
    req.params.id,
    {
      companyId,
      role,
      status,
      notes
    },
    { new: true }
  ).populate("companyId");

if (!updatedApplication) {

  return res.status(404).json({
    message: "Application not found"
  });

}

res.json(updatedApplication);


} catch (err) {


console.error("Update error:", err);

res.status(500).json({
  message: "Server error"
});


}

};

 /*

# DELETE APPLICATION

*/
exports.deleteApplication = async (req, res) => {

try {


const deleted =
  await Application.findByIdAndDelete(req.params.id);

if (!deleted) {

  return res.status(404).json({
    message: "Application not found"
  });

}

res.json({ message: "Application deleted" });


} catch (err) {


console.error(err);
res.status(500).json({ message: "Server error" });


}

};

/*

# GET RECENT APPLICATIONS

*/
exports.getRecentApplications = async (req, res) => {

try {


const apps = await Application
  .find()
  .populate("companyId")
  .sort({ createdAt: -1 })
  .limit(5);

res.json(apps);


} catch (err) {


console.error(err);
res.status(500).json({ message: "Server error" });


}

};
