#!/usr/bin/env bun

import { configDotenv } from "dotenv";
import postgres from "postgres";

// Load env vars
configDotenv({ path: ".env.local" });
configDotenv({ path: ".env" });

const client = postgres(process.env.DATABASE_URL!, { max: 1 });

async function runSql() {
  try {
    console.log('🚀 Adding unique constraint to identity table...');
    
    // First check if the constraint exists
    const checkConstraint = `
      SELECT 1 
      FROM pg_constraint 
      WHERE conname = 'identity_provider_unique';
    `;
    
    const constraintExists = await client.unsafe(checkConstraint);
    
    if (constraintExists.length > 0) {
      console.log('✅ Unique constraint already exists on identity table');
      return;
    }
    
    // If not, add it
    const sql = `
      ALTER TABLE identity
      ADD CONSTRAINT identity_provider_unique 
      UNIQUE (account_id, provider_id);
    `;
    
    const result = await client.unsafe(sql);
    console.log('✅ Successfully added unique constraint to identity table');
    
  } catch (error) {
    console.error('Error running SQL:', error);
  } finally {
    await client.end();
  }
}

runSql().catch(console.error);
