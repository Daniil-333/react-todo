import {Sequelize} from "sequelize";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, process.env.DB_STORAGE || 'db.sqlite');

export default new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: "sqlite",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        storage: dbPath,
        logging: console.log
    }
);