#!/usr/bin/env bun

import { configDotenv } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user, identity } from "./db/schema/user";
import crypto from "node:crypto";

// Load env vars
configDotenv({ path: ".env.local" });
configDotenv({ path: ".env" });

if (!process.env.BETTER_AUTH_SECRET) {
  console.error("BETTER_AUTH_SECRET is not set in environment variables");
  process.exit(1);
}

const client = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(client);

const TEST_EMAIL = "test@example.com";
const TEST_PASSWORD = "test123";

function hashPassword(password: string, secret: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update(password)
    .digest("hex");
}

async function createTestUser() {
  try {
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, TEST_EMAIL));

    if (existingUser.length > 0) {
      console.log(`User ${TEST_EMAIL} already exists, deleting...`);
      await db.delete(identity).where(eq(identity.userId, existingUser[0].id));
      await db.delete(user).where(eq(user.email, TEST_EMAIL));
    }

    // Create user
    console.log(`Creating user: ${TEST_EMAIL}`);
    const [newUser] = await db
      .insert(user)
      .values({
        email: TEST_EMAIL,
        name: "Test User",
        emailVerified: true,
        isAnonymous: false,
        image: null,
      })
      .returning();

    console.log(`Created user with ID: ${newUser.id}`);

    // Create identity with correct format
    const hashedPassword = hashPassword(TEST_PASSWORD, process.env.BETTER_AUTH_SECRET!);
    
    const [newIdentity] = await db
      .insert(identity)
      .values({
        accountId: TEST_EMAIL,  // Using email as accountId for lookup
        providerId: "email",
        userId: newUser.id,
        password: hashedPassword,
      })
      .returning();

    console.log(`Created identity with ID: ${newIdentity.id}`);
    console.log('\n✅ Test user created successfully!');
    console.log(`Email: ${TEST_EMAIL}`);
    console.log(`Password: ${TEST_PASSWORD}`);

  } catch (error) {
    console.error('Error creating test user:', error);
  } finally {
    await client.end();
  }
}

createTestUser().catch(console.error);
