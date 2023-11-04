import * as pg from 'pg';
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    dialectModule: pg,
    dialect: 'postgres',
    logging: false,
  },
);

const dbConnection = async () => {
  try {
    // authenticate
    sequelize.authenticate();

    //synch all tables
    sequelize.sync({ alter: true });
    console.log('Database connection established');
  } catch (error) {
    console.log(error);
  }
};

export { dbConnection, sequelize };
