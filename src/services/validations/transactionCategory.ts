import * as joi from 'joi';

export class TransCtgryVldtionService {
  static create = joi.object({
    category: joi.object({
      name: joi.string().required().min(3).max(25).messages({
        'string.required': 'The name is required',
        'string.min': 'The name must be at least 3 characters',
        'string.max': 'The name must be at most 25 characters',
      }),
      description: joi.string(),
    }),
    type_id: joi.string().required().messages({
      'any.required': 'The type_id is required',
    }),
  });
}
