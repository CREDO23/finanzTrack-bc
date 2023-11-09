import * as joi from 'joi';

export class TransactionValidationService {
  static create = joi.object({
    transaction: joi
      .object({
        amount: joi.number().required().min(1).messages({
          'string.required': ' The transaction.amount is required',
          'number.min': ' The transaction.amount must be a least 1$',
        }),
        description: joi.string().required().min(5).messages({
          'any.required': 'The transaction.description is required',
          'any.min':
            'The transaction.description must be at least 5 characters',
        }),
      })
      .required(),
    category_id: joi.string().required().messages({
      'any.required': 'The type_id is required',
    }),
  });
}
