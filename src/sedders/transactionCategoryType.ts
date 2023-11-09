import TransactionCategoryType from '../models/transactionCategoryType';

const seedTransCtgryType = async (): Promise<void> => {
  const categoryTypes = await TransactionCategoryType.findAll({ raw: true });

  if (categoryTypes.length === 0) {
    await Promise.all([
      TransactionCategoryType.create({
        label: 'incomes',
        description: 'earnings',
      }),
      TransactionCategoryType.create({
        label: 'expenses',
        description: 'money spent to acquire something',
      }),
    ]).then((types) => {
      types.forEach((type) => {
        console.info(
          `The transaction category type ${type.label} has been as ${type.description}`,
        );
      });
    });
  }
};

export default seedTransCtgryType;
