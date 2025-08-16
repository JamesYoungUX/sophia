-- Update identity records to set account_id to the user's email for email provider
UPDATE identity 
SET account_id = u.email,
    updated_at = NOW()
FROM "user" u
WHERE identity.user_id = u.id 
  AND identity.provider_id = 'email' 
  AND identity.account_id != u.email;
