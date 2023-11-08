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
  ModelDefined,
  Optional,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
} from 'sequelize';
import TransactionCategory from './transactionCategory';

export class TransactionCategoryType extends Model<
  InferAttributes<TransactionCategoryType, { omit: 'transaction_categories' }>,
  InferCreationAttributes<
    TransactionCategoryType,
    { omit: 'transaction_categories' }
  >
> {
  declare id: CreationOptional<string>;
  declare label: string;
  declare description: string;

  // Loaded with association
  declare transaction_categories: NonAttribute<TransactionCategory[]>;

  // Association methods
  declare getTransactionCategories: HasManyGetAssociationsMixin<TransactionCategory>;
  declare addTransactionCategory: HasManyAddAssociationMixin<
    TransactionCategory,
    number
  >;
  declare addTransactionCategories: HasManyAddAssociationsMixin<
    TransactionCategory,
    number
  >;
  declare setTransactionCategories: HasManySetAssociationsMixin<
    TransactionCategory,
    number
  >;
  declare removeTransactionCategory: HasManyRemoveAssociationMixin<
    TransactionCategory,
    number
  >;
  declare removeTransactionCategories: HasManyRemoveAssociationsMixin<
    TransactionCategory,
    number
  >;
  declare hasTransactionCategory: HasManyHasAssociationMixin<
    TransactionCategory,
    number
  >;
  declare hasTransactionCategories: HasManyHasAssociationsMixin<
    TransactionCategory,
    number
  >;
  declare countTransactionCategories: HasManyCountAssociationsMixin;
  declare createTransactionCategory: HasManyCreateAssociationMixin<
    TransactionCategory,
    'category_type_id'
  >;

  // Associations
  declare static associations: {
    transaction_categories: Association<
      TransactionCategoryType,
      TransactionCategory
    >;
  };
}

TransactionCategoryType.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'transaction_category_types',
  },
);

export default TransactionCategoryType;
