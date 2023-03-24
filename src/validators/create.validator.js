const Joi = require('joi');

module.exports = Joi.object({
  address: Joi.string().required(),
  price: Joi.number().required(),
  bedrooms: Joi.number().required(),
  bathrooms: Joi.number().required(),
  type: Joi.string()
    .valid('Townhouse', 'SingleFamilyResidence', 'Condominum')
    .optional(),
});
