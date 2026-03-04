
const Joi = require("joi");

const applicationSchema = Joi.object({
  studentId: Joi.string().required(),
  company: Joi.string().min(2).required(),
  role: Joi.string().min(2).required(),
  status: Joi.string()
    .valid("Applied", "Interview", "Rejected", "Offer")
    .default("Applied")
});

module.exports = { applicationSchema };