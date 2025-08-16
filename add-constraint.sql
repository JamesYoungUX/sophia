-- Add unique constraint on account_id and provider_id in identity table
ALTER TABLE identity
ADD CONSTRAINT identity_provider_unique UNIQUE (account_id, provider_id);
