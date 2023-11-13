import { sequelize } from '../config/db';
import {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import TransactionCategory from './transactionCategory';

class Transaction extends Model<
  InferAttributes<Transaction>,
  InferCreationAttributes<Transaction>
> {
  declare id: CreationOptional<string>;
  declare amount: number;
  declare description: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Foreign key
  declare category_id: ForeignKey<TransactionCategory['id']>;
  // Loaded after association
  declare category: NonAttribute<TransactionCategory>;

  // Category mixins
  declare setCategory: BelongsToSetAssociationMixin<
    TransactionCategory,
    string
  >;
  declare getCategory: BelongsToGetAssociationMixin<TransactionCategory>;
  declare createCategory: BelongsToCreateAssociationMixin<TransactionCategory>;

  // Associations
  declare static associations: {
    category: Association<Transaction, TransactionCategory>;
  };
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, modelName: 'transactions' },
);

export default Transaction;
