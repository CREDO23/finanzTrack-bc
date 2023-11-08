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
import TransactionCategoryType from './transactionCategoryType';

class TransactionCategory extends Model<
  InferAttributes<TransactionCategory, { omit: 'type' }>,
  InferCreationAttributes<TransactionCategory, { omit: 'type' }>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;

  // Foreign key
  declare category_type_id: ForeignKey<TransactionCategoryType['id']>;

  // Loaded with association
  declare type: NonAttribute<TransactionCategoryType>;
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
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'transaction_categories' },
);

export default TransactionCategory;
