import TransactionCategoryType from '../models/transactionCategoryType';

export class TransCtgyTypeService {
  static getAll = (): Promise<Error | TransactionCategoryType[]> => {
    return new Promise<Error | TransactionCategoryType[]>(
      async (resolve, reject) => {
        try {
          const transactionCategoryTypes =
            await TransactionCategoryType.findAll({ raw: true });

          resolve(transactionCategoryTypes);
        } catch (error) {
          reject(error);
        }
      },
    );
  };
}
