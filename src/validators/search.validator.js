const Joi = require('joi');

module.exports = Joi.object({
  field: Joi.string().valid('address', 'price', 'bedrooms', 'bathrooms', 'type').required(),
  value: Joi.string().required(),
  operator: Joi.string()
    .valid('eq', 'gt', 'lt', 'ne')
    .required(),
  page: Joi.number().min(1).default(1).optional(),
  size: Joi.number().min(1).max(999999).default(10).optional(),
});