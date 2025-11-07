import sequelize from './config/index.js';

// Тестируем подключение
export const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Синхронизация моделей (в разработке)
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync(); //{force: true}
            console.log('Database synchronized.');
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

export default sequelize;