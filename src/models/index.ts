import TransactionCategory from './transactionCategory';
import TransactionCategoryType from './transactionCategoryType';

TransactionCategoryType.hasMany(TransactionCategory, {
  as: 'transaction_categories',
  foreignKey: 'transaction_category_type',
  sourceKey: 'id',
});
// TransactionCategory.belongsTo(TransactionCategoryType, {
//     as : 'type',
//   })
