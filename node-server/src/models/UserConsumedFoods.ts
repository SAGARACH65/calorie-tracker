import * as uuid from 'uuid';
import * as path from 'path';

import knex from '../config/knex';
import { read } from '../utils/fs';
import UserFood from '../domains/responses/UserFood';
import UpdateFoodEntry from '../domains/requests/UpdateFoodEntry';
import AdminUserFood from '../domains/responses/AdminUserFood';
import AdminAddFoodEntry from '../domains/requests/AdminAddFoodEntry';

const queryPath = path.resolve(__dirname, '../database/queries');

/**
 * Fetches the user consumed foods
 *
 * @param {number} userId
 * @returns {Promise<UserFood>}
 */
export const getUserFood = async (userId: number): Promise<UserFood[]> => {
  const data = await knex.raw(
    `
  SELECT
    id,
    name,
    calorie_count,
    food_taken_on_date,
    food_taken_on_time,
    price,
    created_at
  FROM user_consumed_foods
  WHERE user_id = :userId
  ORDER BY food_taken_on_date desc
`,
    { userId }
  );

  return data;
};

/**
 * Fetches all the food consumed by all the users in the application
 *
 * @returns {Promise<AdminUserFood>}
 */
export const getAllFoods = async (): Promise<AdminUserFood[]> => {
  const fetchUserQuery = await read(`${queryPath}/get_all_users_food.sql`);

  const data = await knex.raw(fetchUserQuery);

  return data;
};

/**
 * Adds a food entry to the table
 *
 * @param {UpdateFoodEntry} data
 * @param {number} userId
 * @returns {Promise<void>}
 */
export const addUserFood = async (data: UpdateFoodEntry, userId: number): Promise<void> => {
  await knex.raw(`
  INSERT INTO user_consumed_foods (id, name, user_id, calorie_count, food_taken_on_date, food_taken_on_time, price)
  VALUES ('${uuid.v4()}','${data.foodName}', '${userId}', ${data.calories}, '${
    data.foodTakeOnDate
  }','${data.foodTakeOnTime || 'N/A'}',${data.price || null})
`);
};

/**
 * Deletes a food entry for  user with the a entryId.
 *
 * @param {string} entryId
 * @returns {Promise<void>}
 */
export const deleteUserFood = async (entryId: string): Promise<void> => {
  await knex.raw(`DELETE FROM user_consumed_foods WHERE id = '${entryId}'`);
};

/**
 * Updates a entry for user consumed food
 *
 * @param {UpdateFoodEntry} data
 * @returns {Promise<void>}
 */
export const editUserFood = async (data: UpdateFoodEntry): Promise<void> => {
  await knex.raw(`
  UPDATE
  user_consumed_foods 
  SET calorie_count = ${data.calories},
      name = '${data.foodName}',
      food_taken_on_date = '${data.foodTakeOnDate}',
      food_taken_on_time = '${data.foodTakeOnTime || 'N/A'}',
      price = ${data.price || null}
  WHERE id= '${data.id}'`);
};

/**
 * Adds a food entry to the table
 *
 * @param {AdminAddFoodEntry} data
 * @param {number} userId
 * @returns {Promise<void>}
 */
export const adminAddUserFood = async (data: AdminAddFoodEntry): Promise<void> => {
  await knex.raw(`
  INSERT INTO user_consumed_foods (id, name, user_id, calorie_count, food_taken_on_date, food_taken_on_time, price)
  VALUES ('${uuid.v4()}','${data.foodName}', '${data.assignee}', ${data.calories}, '${
    data.foodTakeOnDate
  }','${data.foodTakeOnTime || 'N/A'}',${data.price || null})
`);
};
