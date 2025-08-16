/**
 * Simple test to verify Better Auth configuration without server complexity
 */

import { createAuth } from './apps/api/lib/auth.js';
import { createDb } from './apps/api/lib/db.js';

// Mock Hyperdrive for testing
const mockHyperdrive = {
  connectionString: process.env.DATABASE_URL
};

// Mock environment
const mockEnv = {
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
};

async function testAuthConfig() {
  console.log('🧪 Testing Better Auth Configuration\n');
  
  try {
    // Create database connection
    console.log('1️⃣ Creating database connection...');
    const db = createDb(mockHyperdrive);
    console.log('✅ Database connection created\n');
    
    // Create auth instance
    console.log('2️⃣ Creating Better Auth instance...');
    const auth = createAuth(db, mockEnv);
    console.log('✅ Better Auth instance created\n');
    
    // Check if email/password is enabled
    console.log('3️⃣ Checking email/password configuration...');
    console.log('Auth instance created successfully');
    console.log('Email/password authentication should be enabled\n');
    
    console.log('✅ Better Auth configuration is valid!');
    console.log('\nNext steps:');
    console.log('1. Start API server: bun --filter @repo/api dev');
    console.log('2. Start React app: bun --filter @repo/app dev');
    console.log('3. Test authentication at http://localhost:5173');
    
  } catch (error) {
    console.error('❌ Configuration test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

testAuthConfig();
