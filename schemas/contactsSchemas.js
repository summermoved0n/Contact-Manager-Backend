import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  // email: Joi.string().required(),
  phone: Joi.string().max(10).required(),
  // favorite: Joi.string(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(20),
  // email: Joi.string(),
  phone: Joi.string().max(10),
})
  .min(1)
  .messages({ "object.min": "Body must have at least one field" });

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
