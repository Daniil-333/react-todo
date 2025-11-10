import { configDotenv } from "dotenv";
import path from "path";

configDotenv({ path: path.join(process.cwd(), '..', '.env') });
console.log('✅ .env loaded in loadEnv');