-- Add a unique constraint on (account_id, provider_id) for the identity table
-- This is required by Better Auth for proper functioning

-- First, check if the constraint already exists
DO $$
BEGIN
    -- Check if the constraint already exists
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conname = 'identity_account_id_provider_id_key'
    ) THEN
        -- Add the unique constraint
        ALTER TABLE identity 
        ADD CONSTRAINT identity_account_id_provider_id_key 
        UNIQUE (account_id, provider_id);
        
        RAISE NOTICE 'Added unique constraint on (account_id, provider_id) to identity table';
    ELSE
        RAISE NOTICE 'Unique constraint on (account_id, provider_id) already exists';
    END IF;
END $$;
