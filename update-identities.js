import { Client } from 'pg';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });
config(); // Load .env if it exists

async function updateIdentityAccountIds() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const client = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    await client.connect();
    
    // Start a transaction
    await client.query('BEGIN');

    // Update identity records to set account_id to the user's email for email provider
    const result = await client.query(`
      UPDATE identity 
      SET account_id = u.email,
          updated_at = NOW()
      FROM "user" u
      WHERE identity.user_id = u.id 
        AND identity.provider_id = 'email' 
        AND identity.account_id != u.email
      RETURNING identity.id, identity.user_id, identity.account_id
    `);

    // Commit the transaction
    await client.query('COMMIT');
    
    console.log(`Successfully updated ${result.rowCount} identity records`);
    if (result.rows.length > 0) {
      console.log('Updated records:', result.rows);
    }
  } catch (error) {
    // Rollback on error
    await client.query('ROLLBACK');
    console.error('Error updating identity records:', error);
    throw error;
  } finally {
    await client.end();
  }
}

updateIdentityAccountIds()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
