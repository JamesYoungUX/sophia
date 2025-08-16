#!/usr/bin/env bun

import { configDotenv } from "dotenv";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user, identity } from "./db/schema/user";

// Load env vars
configDotenv({ path: ".env.local" });
configDotenv({ path: ".env" });

const client = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(client);

const EMAIL = "demouser@example.com";

async function updateIdentity() {
  try {
    // Find the user
    const users = await db.select().from(user).where(eq(user.email, EMAIL));
    
    if (users.length === 0) {
      console.log(`❌ No user found with email: ${EMAIL}`);
      return;
    }
    
    const userData = users[0];
    console.log(`Found user: ${userData.id} (${userData.email})`);
    
    // Update the identity record to use the user ID as accountId
    const result = await db
      .update(identity)
      .set({ 
        accountId: userData.id,
        updatedAt: new Date()
      })
      .where(eq(identity.userId, userData.id));
    
    console.log('✅ Updated identity record:', result);
    
  } catch (error) {
    console.error('Error updating identity:', error);
  } finally {
    await client.end();
  }
}

updateIdentity().catch(console.error);
