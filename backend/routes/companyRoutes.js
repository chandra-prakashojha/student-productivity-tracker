const express = require("express");

const {
  getCompanies,
  createCompany,
  deleteCompany
} = require("../controllers/companyController");

const router = express.Router();

router.get("/", getCompanies);

router.post("/", createCompany);

router.delete("/:id", deleteCompany);

module.exports = router;