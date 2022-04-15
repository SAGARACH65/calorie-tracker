 SELECT
    ucf.id,
    ucf.name,
    ucf.calorie_count,
    ucf.food_taken_on_date,
    ucf.food_taken_on_time,
    ucf.price,
    ucf.created_at,
    u.username
  FROM user_consumed_foods ucf
 INNER JOIN users u ON u.id = ucf.user_id
  ORDER BY food_taken_on_date desc
