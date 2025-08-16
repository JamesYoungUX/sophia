#!/usr/bin/env bun

import { configDotenv } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { createHmac } from 'node:crypto';
import schema from "../schema";
import { identity, user } from "../schema/user";

// Load env vars
configDotenv({ path: "../.env.local" });
configDotenv({ path: "../.env" });

const client = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(client, { schema });

const EMAIL = "demouser@example.com";
const PASSWORD = "password123";
const NAME = "Demo User";

// Match the hashing used by Better Auth
function hashPassword(password: string): string {
  // Get the secret from environment or use a default for development
  const secret = process.env.BETTER_AUTH_SECRET || 'dWhu3iJMS1oBPsqcv9mZn2URhbFKUMaj';
  if (!secret) {
    throw new Error('BETTER_AUTH_SECRET is not set in environment variables');
  }
  return createHmac('sha256', secret).update(password).digest('hex');
}

async function main() {
  // Check if user exists
  const existing = await db.select().from(user).where(eq(user.email, EMAIL));
  
  // Calculate the password hash
  const hashedPassword = hashPassword(PASSWORD);
  
  if (existing.length > 0) {
    console.log(`User ${EMAIL} already exists (id: ${existing[0].id})`);
    
    // Update the existing user's password
    await db
      .update(identity)
      .set({ 
        password: hashedPassword,
        updatedAt: new Date()
      })
      .where(eq(identity.userId, existing[0].id));
    
    console.log(`✅ Updated password for existing user: ${EMAIL} (password: ${PASSWORD})`);
    return;
  }

  // Insert user
  const [created] = await db
    .insert(user)
    .values({ 
      name: NAME, 
      email: EMAIL, 
      emailVerified: true,
      isAnonymous: false
    })
    .returning();

  // Insert identity record for password login
  await db.insert(identity).values({
    accountId: created.id, // Use the user's ID as the accountId
    providerId: "email",
    userId: created.id,
    password: hashedPassword,
  });

  console.log(`✅ Created demo user: ${EMAIL} (password: ${PASSWORD})`);
}

main()
  .catch(console.error)
  .finally(() => client.end());
