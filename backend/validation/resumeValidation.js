const Joi = require("joi");

const resumeSchema = Joi.object({
  role: Joi.string().min(3).required()
});

module.exports = {
  resumeSchema
};