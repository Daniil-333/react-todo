import "./loadEnv.js";
import express from "express";
import cors from "cors";
import {initializeDatabase} from "./db/index.js";
import {MigrateData} from "./seeders/AddSeeders.js";
import router from "./routes/index.js";
import ErrorHandlerMiddleware from "./middleware/ErrorHandlerMiddleware.js";

console.log('DB_DIALECT:', process.env.DB_DIALECT);

const PORT = process.env.PORT

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(ErrorHandlerMiddleware);

const start = async () => {
    try {
        await initializeDatabase();
        // эмуляция миграций
        await MigrateData();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }catch (e) {
        console.error('❌ Server startup error:', e);
    }
}

start();