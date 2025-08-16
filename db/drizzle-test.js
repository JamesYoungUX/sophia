import { configDotenv } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

configDotenv({ path: "../.env.local" });

const sql = postgres(process.env.DATABASE_URL, { max: 1, idle_timeout: 2 });
const db = drizzle(sql);

(async () => {
  try {
    const result = await db.execute("SELECT 1 as test");
    console.log("Drizzle connected! Result:", result);
    process.exit(0);
  } catch (err) {
    console.error("Drizzle connection error:", err);
    process.exit(1);
  }
})();
