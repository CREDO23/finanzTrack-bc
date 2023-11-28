import { sequelize } from '../config/db';
import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize';
import User from './user';
import TransactionCategory from './transactionCategory';

class UserTransCategories extends Model<
  InferAttributes<UserTransCategories>,
  InferCreationAttributes<UserTransCategories>
> {
  declare id: CreationOptional<string>;

  declare users: NonAttribute<User[]>;
  declare category: NonAttribute<TransactionCategory>;

  // Foreign keys
  declare user_id: ForeignKey<User['id']>;
  declare trans_category_id: ForeignKey<TransactionCategory['id']>;
}

UserTransCategories.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  { sequelize, modelName: 'users_trans_categories' },
);

export default UserTransCategories;
