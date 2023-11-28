import { UUID } from 'crypto';
import TransactionCategory from '../models/transactionCategory';
import { TransCtgryVldtionService } from './validations/transactionCategory';
import * as error from 'http-errors';
import TransactionCategoryType from '../models/transactionCategoryType';
import { validate as isValidUUID } from 'uuid';
import User from '../models/user';
import UserTransCategories from '../models/usersTransCategories';

export class TransactionCategoryService {
  static create = async (
    category: ITransactionCategory,
    type_id: UUID,
    user_id: UUID,
  ): Promise<Error | ITransactionCategory> => {
    return new Promise<Error | ITransactionCategory>(
      async (resolve, reject) => {
        try {
          const validTransactionCategory: {
            category: ITransactionCategory;
            type_id: UUID;
          } = await TransCtgryVldtionService.create.validateAsync({
            category,
            type_id,
          });

          if (!isValidUUID(type_id)) {
            reject(error.NotAcceptable('Invalid format [uuid] for type_id'));
          }

          if (!isValidUUID(user_id)) {
            reject(error.NotAcceptable('Invalid format [uuid] for user_id'));
          }

          // Find the category type
          const categoryType = await TransactionCategoryType.findByPk(type_id);

          //Find the user
          const user = await User.findByPk(user_id);

          // Check if a transaction with the same name exists
          const isExist = await TransactionCategory.findOne({
            where: { name: validTransactionCategory.category.name },
          });

          if (isExist) {
            isExist.addUser(user);

            resolve({
              ...isExist.dataValues,
              type: categoryType,
            });
          } else if (categoryType && user) {
            const newTransactionCategory = await categoryType.createCategory({
              ...validTransactionCategory.category,
            });

            newTransactionCategory.addUser(user);

            resolve({
              ...newTransactionCategory.dataValues,
              type: categoryType,
            });
          } else {
            if (!categoryType) {
              reject(
                error.Conflict(`The category type you provided does not exist`),
              );
            }

            if (!user) {
              reject(error.Conflict(`The user you provided does not exist`));
            }
          }
        } catch (error) {
          reject(error);
        }
      },
    );
  };

  static getAll = async (
    user_id: UUID,
  ): Promise<Error | TransactionCategory[]> => {
    return new Promise<Error | TransactionCategory[]>(
      async (resolve, reject) => {
        try {
          const transactionCategories = await UserTransCategories.findAll({
            where: { user_id },
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
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                  },
                ],
              },
            ],
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'category_id', 'user_id'],
            },
          });
          resolve(transactionCategories.map((el) => el.category));
        } catch (error) {
          reject(error);
        }
      },
    );
  };
}
