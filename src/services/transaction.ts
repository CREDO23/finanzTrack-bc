import { UUID } from 'crypto';
import Transaction from '../models/transaction';
import * as error from 'http-errors';
import { validate as isValidUUID } from 'uuid';
import TransactionCategory from '../models/transactionCategory';
import { TransactionValidationService } from './validations/transaction';
import TransactionCategoryType from '../models/transactionCategoryType';
import { sequelize } from '../config/db';

export class TransactionService {
  static create = async (
    transaction: ITransaction,
    category_id: UUID,
  ): Promise<Error | ITransaction> => {
    return new Promise<Error | ITransaction>(async (resolve, reject) => {
      try {
        const valideTransaction: {
          transaction: ITransaction;
          category_id: UUID;
        } = await TransactionValidationService.create.validateAsync({
          transaction,
          category_id,
        });

        if (!isValidUUID(category_id)) {
          reject(error.NotAcceptable('Invalid format [uuid] for category_id'));
        }

        const transactionCategory = await TransactionCategory.findByPk(
          category_id,
          {
            include: [
              {
                model: TransactionCategoryType,
                attributes: ['id', 'label', 'description'],
                as: 'type',
              },
            ],
            nest: true,
          },
        );

        if (transactionCategory) {
          const newTransaction = await transactionCategory.createTransaction({
            ...valideTransaction.transaction,
          });

          resolve({
            ...newTransaction.dataValues,
            category: transactionCategory,
          });
        } else {
          reject(
            error.NotAcceptable(
              'The trasaction category you provided does not exist',
            ),
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  static getAll = async (owner_id: UUID): Promise<Error | Transaction[]> => {
    return new Promise<Error | Transaction[]>(async (resolve, reject) => {
      try {
        const transactions = await Transaction.findAll({
          raw: true,
          nest: true,
          include: {
            model: TransactionCategory,
            as: 'category',
            include: [
              {
                model: TransactionCategoryType,
                as: 'type',
              },
            ],
          },
          order: [['updatedAt', 'DESC']],
          where: { '$category.owner_id$': owner_id },
        });

        resolve(transactions);
      } catch (error) {
        reject(error);
      }
    });
  };
}
