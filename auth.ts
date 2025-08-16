import { createAuth } from "./apps/api/lib/auth.js";
import { createDb } from "./apps/api/lib/db.js";

// Create a mock environment for Better Auth CLI
const mockEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
};

// Create a mock hyperdrive for database connection
const mockHyperdrive = {
  connectionString: process.env.DATABASE_URL
};

const db = createDb(mockHyperdrive);
export const auth = createAuth(db, mockEnv);
