import { sequelize } from '../config/db';
import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import User from './user';
import Transaction from './transaction';

class UserTransactions extends Model<
  InferAttributes<UserTransactions>,
  InferCreationAttributes<UserTransactions>
> {
  declare id: CreationOptional<string>;

  // Foreign keys
  declare user_id: ForeignKey<User['id']>;
  declare transaction_id: ForeignKey<Transaction['id']>;
}

UserTransactions.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  { sequelize, modelName: 'users_transactions' },
);

export default UserTransactions;
