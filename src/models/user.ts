import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  NonAttribute,
  Association,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  Transaction,
} from 'sequelize';
import { sequelize } from '../config/db';
import TransactionCategory from './transactionCategory';

class User extends Model<
  InferAttributes<User, { omit: 'transactionCategories' }>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: string;

  // Loaded after association
  declare transactionCategories: NonAttribute<TransactionCategory[]>;

  // Transaction categories mixins
  declare getTransactions: HasManyGetAssociationsMixin<TransactionCategory[]>;
  declare addTransaction: HasManyAddAssociationMixin<
    TransactionCategory,
    string
  >;
  declare addTransactions: HasManyAddAssociationsMixin<
    TransactionCategory,
    string
  >;
  declare setTransactions: HasManySetAssociationsMixin<
    TransactionCategory,
    string
  >;
  declare removeTransaction: HasManyRemoveAssociationMixin<
    TransactionCategory,
    string
  >;
  declare removeTransactions: HasManyRemoveAssociationsMixin<
    TransactionCategory,
    string
  >;
  declare hasTransaction: HasManyHasAssociationMixin<
    TransactionCategory,
    string
  >;
  declare hasTransactions: HasManyHasAssociationsMixin<
    TransactionCategory,
    string
  >;
  declare countTransactions: HasManyCountAssociationsMixin;
  declare createTransaction: HasManyCreateAssociationMixin<TransactionCategory>;

  // Associations
  declare static associations: {
    transactionCategories: Association<User, TransactionCategory>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'users',
    sequelize,
  },
);

export default User;
