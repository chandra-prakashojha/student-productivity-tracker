const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,

  // ⭐ allow preflight requests
  skip: (req) => req.method === "OPTIONS"
});

module.exports = limiter;