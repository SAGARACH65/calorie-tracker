SELECT access_token
FROM user_access_tokens uat
INNER JOIN users u ON u.id = uat.user_id
WHERE uat.is_active = true and u.userName = ':userName'
limit 1