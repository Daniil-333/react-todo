import { Sequelize, Dialect } from 'sequelize';
import path from 'path';

let sequelizeInstance: Sequelize | null = null;

export interface DatabaseConfig {
    database: string;
    username: string;
    password: string;
    dialect: Dialect;
    host?: string;
    port?: number;
    storage?: string;
    logging?: boolean | ((sql: string, timing?: number) => void);
}

const getConfig = (): DatabaseConfig => {
    const isProduction = process.env.NODE_ENV === 'production';

    console.log(isProduction)

    const baseConfig = {
        database: process.env.DB_NAME as string,
        username: process.env.DB_USERNAME as string,
        password: process.env.DB_PASSWORD as string,
        logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    };

    if (!isProduction) {
        const dbPath = path.join(process.cwd(), process.env.DB_STORAGE || 'db.sqlite');
        return {
            ...baseConfig,
            dialect: 'sqlite' as Dialect,
            storage: dbPath,
        };
    }

    return {
        ...baseConfig,
        dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
        host: process.env.DB_HOST as string,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    };
};

export const getSequelize = () => {
    if(!sequelizeInstance) {
        const config = getConfig();
        console.log('🔍 Creating Sequelize with config:', config);
        sequelizeInstance = new Sequelize(config);
    }
    return sequelizeInstance;
}

export default getSequelize;