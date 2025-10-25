import {configDotenv} from "dotenv";
import express from "express";
import sequelize from "./db/db.js";
// import "./models/models.js";
import {AddSuperUser} from "./seeders/AddSeeders.js";
import cors from "cors";
import router from "./routes/index.js";
import ErrorHandlerMiddleware from "./middleware/ErrorHandlerMiddleware.js";

configDotenv();

const PORT = process.env.PORT

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(ErrorHandlerMiddleware);


console.log(AddSuperUser)

const start = async () => {
    try {
        await sequelize.authenticate();

        // Проверяем, какие модели зарегистрированы
        // console.log('📊 Registered models:', Object.keys(sequelize.models));

        await sequelize.sync(); //{force: true}
        await AddSuperUser();
        // console.log('✅ All models synchronized');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }catch (e) {
        console.error('❌ Server startup error:', e);
    }
}

start();