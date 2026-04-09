const jwt = require("jsonwebtoken");

// PROTECT ROUTE
const protect = (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    token = req.headers.authorization.split(" ")[1];

    try {

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
        id: decoded.id || decoded._id,
        role: decoded.role,
        email: decoded.email
      };

      next();

    } catch (error) {

      console.error("JWT ERROR:", error.message);

      return res.status(401).json({
        message: "Invalid token"
      });

    }

  } else {

    return res.status(401).json({
      message: "No token provided"
    });

  }

};


// ADMIN ONLY
const adminOnly = (req, res, next) => {

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only"
    });
  }

  next();

};

module.exports = {
  protect,
  adminOnly
};