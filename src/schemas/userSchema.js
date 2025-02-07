import Joi from "joi";

export const newUserSchema = Joi.object({
	firstname: Joi.string().required(),
	lastname: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
	password: Joi.string().min(5).required(),
});

export const loginSchema = Joi.object().keys({
	email: Joi.string().required(),
	password: Joi.string().required(),
});
