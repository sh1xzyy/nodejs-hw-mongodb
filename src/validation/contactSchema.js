import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be at most 20 characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.number().required().messages({
    'any.required': 'Phone number is required',
    'number.base': 'Phone number must be a valid number',
  }),
  email: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Email must be at least 3 characters',
    'string.max': 'Email must be at most 20 characters',
    'any.required': 'Email is required',
  }),
  isFavourite: Joi.boolean().required().messages({
    'any.required': 'isFavourite is required',
    'boolean.base': 'isFavourite must be a boolean value',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': 'Contact type must be one of: work, home, personal',
      'any.required': 'Contact type is required',
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be at most 20 characters',
  }),
  phoneNumber: Joi.number().messages({
    'number.base': 'Phone number must be a valid number',
  }),
  email: Joi.string().min(3).max(20).messages({
    'string.min': 'Email must be at least 3 characters',
    'string.max': 'Email must be at most 20 characters',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be a boolean value',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of: work, home, personal',
  }),
});
