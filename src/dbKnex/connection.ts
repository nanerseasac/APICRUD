import knex, { Knex } from 'knex';
import 'dotenv/config';
import I_DBConnection from '../interfaces/I_DBConnection';

const config: I_DBConnection | Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
};

const connection: Knex = knex(config);

export default connection;