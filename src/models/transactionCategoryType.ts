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
} from 'sequelize';
import TransactionCategory from './transactionCategory';

export class TransactionCategoryType extends Model<
  InferAttributes<TransactionCategoryType, { omit: 'categories' }>,
  InferCreationAttributes<TransactionCategoryType, { omit: 'categories' }>
> {
  declare id: CreationOptional<string>;
  declare label: string;
  declare description: string;

  // Loaded after association
  declare categories: NonAttribute<TransactionCategory[]>;

  // Association methods
  declare getCategories: HasManyGetAssociationsMixin<TransactionCategory[]>;
  declare addCategory: HasManyAddAssociationMixin<TransactionCategory, string>;
  declare addCategories: HasManyAddAssociationsMixin<
    TransactionCategory,
    string
  >;
  declare setCategories: HasManySetAssociationsMixin<
    TransactionCategory,
    string
  >;
  declare removeCategory: HasManyRemoveAssociationMixin<
    TransactionCategory,
    string
  >;
  declare removeCategories: HasManyRemoveAssociationsMixin<
    TransactionCategory,
    string
  >;
  declare hasCategory: HasManyHasAssociationMixin<TransactionCategory, string>;
  declare hasCategories: HasManyHasAssociationsMixin<
    TransactionCategory,
    string
  >;
  declare countCategories: HasManyCountAssociationsMixin;
  declare createCategory: HasManyCreateAssociationMixin<
    TransactionCategory,
    'type_id'
  >;

  // Associations
  declare static associations: {
    category: Association<TransactionCategoryType, TransactionCategory>;
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
