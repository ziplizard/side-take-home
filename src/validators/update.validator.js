const Joi = require('joi');

module.exports = Joi.object({
  address: Joi.string().optional(),
  price: Joi.number().optional(),
  bedrooms: Joi.number().optional(),
  bathrooms: Joi.number().optional(),
  type: Joi.string()
    .valid('Townhouse', 'SingleFamilyResidence', 'Condominum')
    .optional(),
});
