module.exports = (schema) => (req, res, next) => {
  if (!schema) {
    return res.status(500).json({
      message: "Validation schema missing"
    });
  }

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};