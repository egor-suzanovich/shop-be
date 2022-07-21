import * as Joi from '@hapi/joi';

export const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(10).max(256).required(),
  count: Joi.number().positive().integer().min(0).max(9999).required(),
  price: Joi.number().positive().integer().min(1).max(9999).required(),
});
