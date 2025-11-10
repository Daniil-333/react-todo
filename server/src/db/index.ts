import {getSequelize} from './config/index.js';

const sequelize = getSequelize();

export const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        await sequelize.sync({ alter: false }); //{force: true}
        console.log('Database synchronized.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};