import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { configDotenv } from 'dotenv';
import bcrypt from 'bcryptjs';
import { identity, user } from './db/schema/user';

// Load environment variables
configDotenv({ path: '.env.local' });
configDotenv({ path: '.env' });

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function testLogin() {
  const DEMO_EMAIL = 'demouser@example.com';
  const DEMO_PASSWORD = 'password123';
  
  try {
    console.log('🔍 Testing login for:', DEMO_EMAIL);
    
    // 1. Find the user by email
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.email, DEMO_EMAIL))
      .limit(1);
    
    if (userRecord.length === 0) {
      console.error('❌ User not found');
      return;
    }
    
    console.log('✅ Found user:', userRecord[0].email);
    
    // 2. Find the identity record
    const identityRecord = await db
      .select()
      .from(identity)
      .where(eq(identity.userId, userRecord[0].id));
    
    if (identityRecord.length === 0) {
      console.error('❌ No identity record found for user');
      return;
    }
    
    console.log('🔑 Found identity record with provider:', identityRecord[0].providerId);
    
    // 3. Verify the password
    const hashedPassword = identityRecord[0].password;
    if (!hashedPassword) {
      console.error('❌ No password hash found for user');
      return;
    }
    
    console.log('🔑 Verifying password...');
    const isPasswordValid = await bcrypt.compare(DEMO_PASSWORD, hashedPassword);
    
    if (isPasswordValid) {
      console.log('✅ Password is valid!');
      console.log('\n🎉 Login successful!');
      console.log('User ID:', userRecord[0].id);
      console.log('Email:', userRecord[0].email);
      console.log('Name:', userRecord[0].name);
    } else {
      console.error('❌ Invalid password');
      console.log('Hash in DB:', hashedPassword);
      
      // Log what the hash should be for debugging
      const newHash = await bcrypt.hash(DEMO_PASSWORD, 10);
      console.log('New hash for comparison:', newHash);
    }
    
  } catch (error) {
    console.error('Error during login test:', error);
  } finally {
    await client.end();
  }
}

testLogin();
