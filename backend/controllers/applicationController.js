const Application = require("../models/Application");


// GET ALL APPLICATIONS
exports.getApplications = async (req, res) => {
  try {

    const applications = await Application.find().sort({ createdAt: -1 });

    res.json(applications);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }
};



// CREATE APPLICATION
exports.createApplication = async (req, res) => {

  try {

    const { company, role, status } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Company and role required" });
    }

    const application = new Application({
      company,
      role,
      status
    });

    const savedApplication = await application.save();

    res.status(201).json(savedApplication);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};



// DELETE APPLICATION
exports.deleteApplication = async (req, res) => {

  try {

    await Application.findByIdAndDelete(req.params.id);

    res.json({ message: "Application deleted" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};



// GET RECENT APPLICATIONS
exports.getRecentApplications = async (req, res) => {

  try {

    const apps = await Application
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(apps);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};