import Transaction from './transaction';
import TransactionCategory from './transactionCategory';
import TransactionCategoryType from './transactionCategoryType';
import User from './user';
import UserTransCategories from './usersTransCategories';

// Transaction - TransactionCategory
TransactionCategory.hasMany(Transaction, {
  as: { singular: 'transaction', plural: 'transactions' },
  foreignKey: 'category_id',
});
Transaction.belongsTo(TransactionCategory, {
  as: 'category',
  foreignKey: 'category_id',
});

// TransactionCategory - User
TransactionCategory.belongsToMany(User, {
  through: UserTransCategories,
  as: 'user',
  foreignKey: 'category_id',
});
User.belongsToMany(TransactionCategory, {
  through: UserTransCategories,
  as: { plural: 'transactionCategories', singular: 'transactionCategoriy' },
  foreignKey: 'user_id',
});
UserTransCategories.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
});
UserTransCategories.belongsTo(TransactionCategory, {
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
