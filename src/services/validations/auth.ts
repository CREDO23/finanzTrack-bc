import * as joi from 'joi';

export class AuthValidationService {
  static register = joi.object({
    name: joi.string().required().min(5).messages({
      'any.required': 'The name is required',
      'any.min': 'The name must be at least 5 characters',
    }),
    email: joi.string().required().email().messages({
      'any.required': 'The email is required',
      'any.email': 'You must provide a valid email address',
    }),
    password: joi.string().required().min(5).messages({
      'any.required': 'The passowrd is required',
      'any.min': 'The name must be at least 5 characters',
    }),
  });

  static login = joi.object({
    email: joi.string().required().messages({
      'any.required': 'The email is required',
    }),
    password: joi.string().required().messages({
      'any.required': 'The password is required',
    }),
  });
}
