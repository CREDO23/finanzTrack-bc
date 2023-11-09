import { sequelize } from '../config/db';
import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';
import TransactionCategoryType from './transactionCategoryType';
import Transaction from './transaction';

class TransactionCategory extends Model<
  InferAttributes<TransactionCategory, { omit: 'type' | 'transactions' }>,
  InferCreationAttributes<TransactionCategory, { omit: 'type' }>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;

  // Foreign key
  declare type_id: ForeignKey<TransactionCategoryType['id']>;

  // Loaded after association
  declare type: NonAttribute<TransactionCategoryType>;
  declare transactions: NonAttribute<Transaction[]>;

  // Type mixins
  declare setType: BelongsToSetAssociationMixin<
    TransactionCategoryType,
    number
  >;
  declare getType: BelongsToGetAssociationMixin<TransactionCategoryType>;
  declare createType: BelongsToCreateAssociationMixin<TransactionCategoryType>;

  // Transaction mixins
  declare getTransactions: HasManyGetAssociationsMixin<Transaction[]>;
  declare addTransaction: HasManyAddAssociationMixin<Transaction, string>;
  declare addTransactions: HasManyAddAssociationsMixin<Transaction, string>;
  declare setTransactions: HasManySetAssociationsMixin<Transaction, string>;
  declare removeTransaction: HasManyRemoveAssociationMixin<Transaction, string>;
  declare removeTransactions: HasManyRemoveAssociationsMixin<
    Transaction,
    string
  >;
  declare hasTransaction: HasManyHasAssociationMixin<Transaction, string>;
  declare hasTransactions: HasManyHasAssociationsMixin<Transaction, string>;
  declare countTransactions: HasManyCountAssociationsMixin;
  declare createTransaction: HasManyCreateAssociationMixin<
    Transaction,
    'category_id'
  >;

  // Associations
  declare static associations: {
    transactions: Association<TransactionCategory, Transaction>;
    types: Association<TransactionCategory, TransactionCategoryType>;
  };
}

TransactionCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'transaction_categories' },
);

export default TransactionCategory;
