import Transaction from './transaction';
import TransactionCategory from './transactionCategory';
import TransactionCategoryType from './transactionCategoryType';

// Transaction - TransactionCategory
TransactionCategory.hasMany(Transaction, {
  as: { singular: 'transaction', plural: 'transactions' },
  foreignKey: 'category_id',
});
Transaction.belongsTo(TransactionCategory, {
  as: 'category',
  foreignKey: 'category_id',
});

// TransactionCategory - TransactionCategoryType
TransactionCategoryType.hasMany(TransactionCategory, {
  as: { singular: 'category', plural: 'categories' },
  foreignKey: 'type_id',
});
TransactionCategory.belongsTo(TransactionCategoryType, {
  as: 'type',
  foreignKey: 'type_id',
});
