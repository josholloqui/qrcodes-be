import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
  dialect: 'postgres',
  database: 'qrcodes',
  storage: ':memory:',
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  models: [__dirname + '/models']
})
