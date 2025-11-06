import express from "express";
import {configDotenv} from "dotenv";
import cors from "cors";
import sequelize from "./db/db.js";
import {MigrateData} from "./seeders/AddSeeders.js";
import router from "./routes/index.js";
import ErrorHandlerMiddleware from "./middleware/ErrorHandlerMiddleware.js";

configDotenv();

const PORT = process.env.PORT

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(ErrorHandlerMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate();

        // Проверяем, какие модели зарегистрированы
        // console.log('📊 Registered models:', Object.keys(sequelize.models));

        await sequelize.sync(); //{force: true}
        // эмуляция миграций
        await MigrateData();
        // console.log('✅ All models synchronized');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }catch (e) {
        console.error('❌ Server startup error:', e);
    }
}

start();