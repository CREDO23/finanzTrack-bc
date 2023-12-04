import { UUID } from 'crypto';
import Transaction from '../models/transaction';
import * as error from 'http-errors';
import { validate as isValidUUID } from 'uuid';
import TransactionCategory from '../models/transactionCategory';
import { TransactionValidationService } from './validations/transaction';
import TransactionCategoryType from '../models/transactionCategoryType';
import UserTransCategories from '../models/usersTransCategories';
import User from '../models/user';

export class TransactionService {
  static create = async (
    transaction: ITransaction,
    category_id: UUID,
    user_id: UUID,
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

        const user = await User.findByPk(user_id);

        if (transactionCategory && user) {
          const newTransaction = await transactionCategory.createTransaction({
            ...valideTransaction.transaction,
          });

          user.addTransaction(newTransaction);

          resolve({
            ...newTransaction.dataValues,
            category: transactionCategory,
          });
        } else {
          if (!transactionCategory) {
            reject(
              error.NotAcceptable(
                'The trasaction category you provided does not exist',
              ),
            );
          }

          if (!user) {
            reject(error.NotAcceptable('The user you provided does not exist'));
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  static getAll = async (user_id: UUID): Promise<Error | Transaction[]> => {
    return new Promise<Error | Transaction[] | any>(async (resolve, reject) => {
      try {
        const transactions = await Transaction.findAll({
          raw: true,
          nest: true,
          include: [
            {
              model: TransactionCategory,
              as: 'category',
              include: [
                {
                  model: TransactionCategoryType,
                  as: 'type',
                },
              ],
            },
          ],
          where: { user_id },
          order: [['updatedAt', 'DESC']],
        });

        resolve(transactions);
      } catch (error) {
        reject(error);
      }
    });
  };
}
