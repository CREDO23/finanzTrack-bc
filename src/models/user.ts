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
} from 'sequelize';
import { sequelize } from '../config/db';
import TransactionCategory from './transactionCategory';
import Transaction from './transaction';

class User extends Model<
  InferAttributes<User, { omit: 'transactions' }>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: string;

  // Loaded after association
  declare transactions: NonAttribute<Transaction[]>;

  // Transaction categories mixins
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
  declare createTransaction: HasManyCreateAssociationMixin<Transaction>;

  // Associations
  declare static associations: {
    transactionCategories: Association<User, Transaction>;
    transactions: Association<User, Transaction>;
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
