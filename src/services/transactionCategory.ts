import { UUID } from 'crypto';
import TransactionCategory from '../models/transactionCategory';
import { TransCtgryVldtionService } from './validations/transactionCategory';
import * as error from 'http-errors';
import TransactionCategoryType from '../models/transactionCategoryType';
import { validate as isValidUUID } from 'uuid';

export class TransactionCategoryService {
  static create = async (
    category: ITransactionCategory,
    type_id: UUID,
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

          const isExist = await TransactionCategory.findOne({
            where: { name: validTransactionCategory.category.name },
          });

          const categoryType = await TransactionCategoryType.findByPk(type_id);

          if (!isExist && categoryType) {
            const newTransactionCategory = await categoryType.createCategory({
              ...validTransactionCategory.category,
            });

            resolve(newTransactionCategory);
          } else {
            if (!categoryType) {
              reject(
                error.Conflict(`The category type you provided does not exist`),
              );
            }

            if (isExist) {
              reject(
                error.Conflict(
                  `A category with name ${validTransactionCategory.category.name}  already exists`,
                ),
              );
            }
          }
        } catch (error) {
          reject(error);
        }
      },
    );
  };

  static getAll = async (): Promise<Error | TransactionCategory[]> => {
    return new Promise<Error | TransactionCategory[]>(
      async (resolve, reject) => {
        try {
          const transactionCategories = await TransactionCategory.findAll({
            raw: true,
            include: [
              {
                model: TransactionCategoryType,
                attributes: ['id', 'label', 'description'],
                as: 'type',
              },
            ],
            nest: true,
            attributes: { exclude: ['type_id'] },
          });

          resolve(transactionCategories);
        } catch (error) {
          reject(error);
        }
      },
    );
  };
}
