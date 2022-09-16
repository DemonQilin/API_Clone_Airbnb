import 'dotenv/config';
import { Sequelize } from 'sequelize';

const db = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    logging: false,
    dialectOptions: process.env.NODE_ENV === 'production'
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
        : {}
});

export default db;
