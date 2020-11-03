import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize('postgres://nunbuxlxmniuch:5e5118ecc5c0d6aa99f457f18ddcef5a6afef1ccb3498d701bb4a4e931336f30@ec2-54-164-134-207.compute-1.amazonaws.com:5432/d7bbfler556rcb', {
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
