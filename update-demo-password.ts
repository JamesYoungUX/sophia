import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import { configDotenv } from 'dotenv';
import bcrypt from 'bcryptjs';
import { identity } from './db/schema/user';

// Load environment variables
configDotenv({ path: '.env.local' });
configDotenv({ path: '.env' });

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function updateDemoPassword() {
  try {
    const DEMO_EMAIL = 'demouser@example.com';
    const DEMO_PASSWORD = 'password123';

    console.log('🔑 Hashing new password...');
    const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);
    
    console.log('🔄 Updating demo user password...');
    
    // Find the identity record for the demo user
    const demoIdentity = await db
      .select()
      .from(identity)
      .where(eq(identity.accountId, DEMO_EMAIL))
      .limit(1);
    
    if (demoIdentity.length === 0) {
      console.error('❌ Demo user identity not found');
      return;
    }
    
    // Update the password with bcrypt hash
    await db
      .update(identity)
      .set({ 
        password: hashedPassword,
        updatedAt: new Date()
      })
      .where(eq(identity.id, demoIdentity[0].id));
    
    console.log('✅ Demo user password updated successfully!');
    console.log(`Email: ${DEMO_EMAIL}`);
    console.log(`Password: ${DEMO_PASSWORD}`);
    
  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    await client.end();
  }
}

updateDemoPassword();
