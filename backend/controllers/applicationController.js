const Application = require("../models/Application");
const Company = require("../models/Company");



/*
=====================================
GET APPLICATIONS (WITH FILTER + PAGINATION)
=====================================
*/
exports.getApplications = async (req, res) => {

  try {

    const { page = 1, limit = 10, status, search } = req.query;

    const query = {};

    // filter by status
    if (status) {
      query.status = status;
    }

    // search by company name
    if (search) {
      const companies = await Company.find({
        name: { $regex: search, $options: "i" }
      });

      query.companyId = { $in: companies.map(c => c._id) };
    }

    const applications = await Application
      .find(query)
      .populate("companyId")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Application.countDocuments(query);

    res.json({
      applications,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }
};



/*
=====================================
CREATE APPLICATION
=====================================
*/
exports.createApplication = async (req, res) => {

  try {

    const { companyId, role, status } = req.body;

    if (!companyId || !role) {
      return res.status(400).json({
        message: "Company and role required"
      });
    }

    // check if company exists
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found"
      });
    }

    const application = new Application({
  companyId,
  role,
  status,
  history:[
    {
      status: status || "Applied"
    }
  ]
});
    
    
    const savedApplication = await application.save();

    const populatedApplication = await savedApplication.populate("companyId");

    res.status(201).json(populatedApplication);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};



/*
=====================================
UPDATE APPLICATION
=====================================
*/
exports.updateApplication = async (req,res)=>{

  try{

    const { companyId, role, status } = req.body;

    const application = await Application.findById(req.params.id);

    if(!application){
      return res.status(404).json({ message:"Application not found" });
    }

    /* Track history if status changed */

    if(status && status !== application.status){

      application.history.push({
        status
      });

    }

    application.companyId = companyId;
    application.role = role;
    application.status = status;

    await application.save();

    const populated = await application.populate("companyId");

    res.json(populated);

  }catch(err){

    console.error(err);
    res.status(500).json({ message:"Server error" });

  }

};

/*
=====================================
DELETE APPLICATION
=====================================
*/
exports.deleteApplication = async (req, res) => {

  try {

    const deleted = await Application.findByIdAndDelete(req.params.id);

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
=====================================
GET RECENT APPLICATIONS
=====================================
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