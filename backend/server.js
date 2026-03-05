require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();


// CONNECT DATABASE
connectDB();


// ⭐ ENABLE CORS (MUST BE FIRST)
app.use(cors());


// ⭐ BODY PARSER
app.use(express.json());


// LOGGER
app.use(morgan("dev"));


// ⭐ RATE LIMITER (AFTER CORS)
app.use(rateLimiter);


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);


// HEALTH ROUTE
app.get("/", (req, res) => {
  res.send("Placement Tracker API Running");
});


// ERROR HANDLER
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});