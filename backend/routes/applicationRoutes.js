const express = require("express");
const router = express.Router();

/* CONTROLLERS */

const {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getRecentApplications
} = require("../controllers/applicationController");


/*
=====================================
GET RECENT APPLICATIONS (Dashboard)
=====================================
*/
router.get("/recent", getRecentApplications);


/*
=====================================
GET ALL APPLICATIONS
=====================================
*/
router.get("/", getApplications);


/*
=====================================
CREATE APPLICATION
=====================================
*/
router.post("/", createApplication);


/*
=====================================
UPDATE APPLICATION
=====================================
*/
router.put("/:id", updateApplication);


/*
=====================================
DELETE APPLICATION
=====================================
*/
router.delete("/:id", deleteApplication);


module.exports = router;