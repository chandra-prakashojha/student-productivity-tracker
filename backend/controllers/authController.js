const { getCollection } = require("../config/db");
const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = asyncHandler(async (req, res) => {
  const users = getCollection("users");
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = new Error("All fields are required");
    error.status = 400;
    throw error;
  }

  const existingUser = await users.findOne({ email });

  if (existingUser) {
    const error = new Error("User already exists");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await users.insertOne({
    name,
    email,
    password: hashedPassword,
    role: "user", // default role
    createdAt: new Date(),
  });

  res.status(201).json({ message: "User registered successfully" });
});

// LOGIN
const loginUser = asyncHandler(async (req, res) => {
  const users = getCollection("users");
  const { email, password } = req.body;

  const user = await users.findOne({ email });

  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token,
  });
});

module.exports = {
  registerUser,
  loginUser,
};