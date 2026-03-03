require("dotenv").config();

const express = require("express");
const { connectDB } = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Placement Tracker API Running 🚀" });
});

// AUTH ROUTES
app.use("/api/auth", authRoutes);

// STUDENT ROUTES
app.use("/students", studentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});