import {Sequelize} from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, process.env.DB_STORAGE || 'db.sqlite');

export default new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    {
        dialect: "sqlite",
        host: process.env.DB_HOST as string,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        storage: dbPath as string,
        logging: console.log
    }
);