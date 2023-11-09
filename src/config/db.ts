import * as pg from 'pg';
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(`${process.env.DB_URI}`, {
  dialectModule: pg,
  dialect: 'postgres',
  logging: false,
});

// Load all models/associations
import '../models';
import seedTransCtgryType from '../sedders/transactionCategoryType';

const dbConnection = async () => {
  try {
    // authenticate
    sequelize.authenticate();

    //synch all tables
    sequelize.sync({ alter: true }).then(() => seedTransCtgryType());
    console.log('Database connection established');
  } catch (error) {
    console.log(error);
  }
};

export { dbConnection, sequelize };
