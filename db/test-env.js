import { configDotenv } from "dotenv";

for (const file of [`.env.dev.local`, ".env.local", ".env"]) {
  configDotenv({ path: `../${file}` });
}

console.log("DATABASE_URL:", process.env.DATABASE_URL);
