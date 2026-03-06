require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const companyRoutes = require("./routes/companyRoutes");

// MIDDLEWARE
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();



/*
====================================
DATABASE CONNECTION
====================================
*/
connectDB();



/*
====================================
GLOBAL MIDDLEWARE
====================================
*/

// security headers
app.use(helmet());

// enable cors
app.use(cors());

// body parser
app.use(express.json({ limit: "10mb" }));

// logger
app.use(morgan("dev"));

// rate limiter
app.use(rateLimiter);



/*
====================================
API ROUTES
====================================
*/

app.use("/api/auth", authRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/companies", companyRoutes);



/*
====================================
HEALTH CHECK
====================================
*/
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Placement Tracker API running",
    time: new Date()
  });
});



/*
====================================
ERROR HANDLER
====================================
*/
app.use(errorHandler);



/*
====================================
SERVER START
====================================
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});