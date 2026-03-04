
const Joi = require("joi");

const createStudentValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    role: Joi.string().min(2).max(50).required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  next();
};

const updateStudentValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50),
    role: Joi.string().min(2).max(50)
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message
    });
  }

  next();
};

module.exports = {
  createStudentValidation,
  updateStudentValidation
};