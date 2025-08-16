#!/usr/bin/env bun

import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user, identity } from "../schema/user";

// Load env vars
configDotenv({ path: "../../.env.local" });
configDotenv({ path: "../../.env" });

const client = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(client);

async function createUser(email: string, password: string, name: string) {
  // Check if user exists
  const existing = await db.select().from(user).where(eq(user.email, email));
  
  if (existing.length > 0) {
    console.log(`User ${email} already exists (id: ${existing[0].id})`);
    return;
  }

  // Hash password
  const hash = await bcrypt.hash(password, 10);

  try {
    // Insert user
    const [newUser] = await db
      .insert(user)
      .values({ 
        name, 
        email, 
        emailVerified: true 
      })
      .returning();

    // Insert identity record for password login
    await db.insert(identity).values({
      accountId: email,
      providerId: 'email',
      userId: newUser.id,
      password: hash,
    });

    console.log(`✅ Created user: ${email} (password: ${password})`);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Example usage
if (import.meta.main) {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.log('Usage: bun run add-user.ts <email> <password> <name>');
    process.exit(1);
  }
  
  const [email, password, ...nameParts] = args;
  const name = nameParts.join(' ');
  
  createUser(email, password, name)
    .catch(console.error)
    .finally(() => process.exit());
}

export { createUser };
