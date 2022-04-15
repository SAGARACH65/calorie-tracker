SELECT 
    u.*
FROM user_access_tokens uat
INNER JOIN users u ON u.id = uat.user_id
WHERE uat.access_token = :token
    AND uat.is_active = true