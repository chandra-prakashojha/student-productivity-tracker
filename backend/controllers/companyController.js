const Company = require("../models/Company");


// GET ALL COMPANIES
exports.getCompanies = async (req, res) => {

  try {

    const companies = await Company.find().sort({ createdAt: -1 });

    res.json(companies);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};



// CREATE COMPANY
exports.createCompany = async (req, res) => {

  try {

    const { name, location, website, description } = req.body;

    const company = new Company({
      name,
      location,
      website,
      description
    });

    const savedCompany = await company.save();

    res.status(201).json(savedCompany);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};



// DELETE COMPANY
exports.deleteCompany = async (req, res) => {

  try {

    await Company.findByIdAndDelete(req.params.id);

    res.json({ message: "Company deleted" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};