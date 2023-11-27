import { UUID } from 'crypto';
import TransactionCategory from '../models/transactionCategory';
import { TransCtgryVldtionService } from './validations/transactionCategory';
import * as error from 'http-errors';
import TransactionCategoryType from '../models/transactionCategoryType';
import { validate as isValidUUID } from 'uuid';
import User from '../models/user';
import UserTransCategories from '../models/usersCategories';

export class TransactionCategoryService {
  static create = async (
    category: ITransactionCategory,
    type_id: UUID,
    owner_id: UUID,
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

          if (!isValidUUID(owner_id)) {
            reject(error.NotAcceptable('Invalid format [uuid] for user_id'));
          }

          // Check if a transaction with the same name exists
          const isExist = await TransactionCategory.findOne({
            where: { name: validTransactionCategory.category.name },
          });

          // Find the category type
          const categoryType = await TransactionCategoryType.findByPk(type_id);
          //Find the owner
          const owner = await User.findByPk(owner_id);

          if (isExist) {
            isExist.addUser(owner);

            resolve(isExist);
          } else if (categoryType && owner) {
            const newTransactionCategory = await categoryType.createCategory({
              ...validTransactionCategory.category,
            });

            newTransactionCategory.addUser(owner);

            const { email, name, id } = owner;

            resolve({
              ...newTransactionCategory.dataValues,
              type: categoryType,
              owner: { email, name, id },
            });
          } else {
            if (!categoryType) {
              reject(
                error.Conflict(`The category type you provided does not exist`),
              );
            }

            if (!owner) {
              reject(error.Conflict(`The owner you provided does not exist`));
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
  ): Promise<Error | UserTransCategories[]> => {
    return new Promise<Error | UserTransCategories[]>(
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

          resolve(transactionCategories);
        } catch (error) {
          reject(error);
        }
      },
    );
  };
}
