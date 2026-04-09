import Application from "../models/Application.js";
import Company from "../models/Company.js";
import mongoose from "mongoose";

/*
# GET APPLICATIONS
*/
export const getApplications = async (req, res) => {

  try {

    let query = {};

    if (req.user.role !== "admin") {
      query.userId = new mongoose.Types.ObjectId(req.user.id);
    }

    const applications = await Application
      .find(query)
      .populate("companyId")
      .sort({ createdAt: -1 });

    res.json({ applications });

  } catch (err) {

    console.error("GET APPLICATIONS ERROR:", err);
    res.status(500).json({ message: "Server error" });

  }

};


/*
# CREATE APPLICATION
*/
export const createApplication = async (req, res) => {

  try {

    console.log("==== NEW REQUEST ====");
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { companyId, role, status } = req.body;

    if (!companyId || !role) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const application = await Application.create({
      companyId,
      role,
      status,
      userId: new mongoose.Types.ObjectId(req.user.id)
    });

    res.status(201).json(application);

  } catch (error) {

    console.log("CREATE APPLICATION ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

};


/*
# UPDATE APPLICATION
*/
export const updateApplication = async (req, res) => {

  try {

    let { companyId, role, status, notes } = req.body;

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

    console.error("UPDATE APPLICATION ERROR:", err);

    res.status(500).json({
      message: "Server error"
    });

  }

};


/*
# DELETE APPLICATION
*/
export const deleteApplication = async (req, res) => {

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

    console.error("DELETE APPLICATION ERROR:", err);
    res.status(500).json({ message: "Server error" });

  }

};


/*
# GET RECENT APPLICATIONS
*/
export const getRecentApplications = async (req, res) => {

  try {

    let query = {};

    if (req.user.role !== "admin") {
      query.userId = new mongoose.Types.ObjectId(req.user.id);
    }

    const apps = await Application
      .find(query)
      .populate("companyId")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(apps);

  } catch (err) {

    console.error("RECENT APPLICATION ERROR:", err);
    res.status(500).json({ message: "Server error" });

  }

};


/*
# GET APPLICATION BY ID
*/
export const getApplicationById = async (req, res) => {

  try {

    const application = await Application
      .findById(req.params.id)
      .populate("companyId", "name");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);

  } catch (error) {

    console.error("GET APPLICATION BY ID ERROR:", error);

    res.status(500).json({ message: error.message });

  }

};


/*
# ADD INTERVIEW ROUND
*/
export const addInterviewRound = async (req, res) => {

  try {

    const { id } = req.params;
    const { roundName, date, status, notes } = req.body;

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.interviewRounds.push({
      roundName,
      date,
      status,
      notes
    });

    await application.save();

    res.json(application);

  } catch (error) {

    console.error("ADD INTERVIEW ROUND ERROR:", error);

    res.status(500).json({ message: error.message });

  }

};


/*
# COMPANY ANALYTICS
*/
export const getCompanyAnalytics = async (req, res) => {

  try {

    let matchStage = {};

    if (req.user.role !== "admin") {
      matchStage = {
        userId: new mongoose.Types.ObjectId(req.user.id)
      };
    }

    const analytics = await Application.aggregate([

      { $match: matchStage },

      {
        $group: {
          _id: "$companyId",
          totalApplications: { $sum: 1 }
        }
      },

      { $sort: { totalApplications: -1 } },

      {
        $lookup: {
          from: "companies",
          localField: "_id",
          foreignField: "_id",
          as: "company"
        }
      },

      { $unwind: "$company" },

      {
        $project: {
          _id: 0,
          companyName: "$company.name",
          totalApplications: 1
        }
      }

    ]);

    res.json(analytics);

  } catch (error) {

    console.log("COMPANY ANALYTICS ERROR:", error);

    res.status(500).json({ message: error.message });

  }

};