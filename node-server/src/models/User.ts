import * as path from 'path';

import knex from '../config/knex';
import { read } from '../utils/fs';
import User from '../domains/responses/User';
import UserTypes from '../enums/UserTypes';

const queryPath = path.resolve(__dirname, '../database/queries');

/**
 * Fetches the user data
 *
 * @param {number} userId
 * @returns {Promise<User>}
 */
export async function getUserData(userId: number): Promise<User> {
  const fetchUserQuery = await read(`${queryPath}/get_user_data.sql`);

  const [data] = await knex.raw<User[]>(fetchUserQuery, { userId: userId });

  return data;
}

/**
 * Fetches the user data from token
 *
 * @param {number} token
 * @returns {Promise<User>}
 */
export async function getUserDataFromToken(token: string): Promise<User> {
  const fetchUserQuery = await read(`${queryPath}/get_user_from_token.sql`);

  const [data] = await knex.raw<User[]>(fetchUserQuery, { token });

  return data;
}

/**
 * Returns a access token for the user with username. It just checks the username for now.
 * In the full implementation we would have a username and password validation here
 *
 * @param {string} userName
 * @returns {Promise<{ accessToken: string; role: UserTypes }>}
 */
export async function getUserToken(
  userName: string
): Promise<{ accessToken: string; role: UserTypes }> {
  const [data] = await knex.raw<[{ accessToken: string; role: UserTypes }]>(
    `
  SELECT 
    access_token,
    u.role
  FROM user_access_tokens uat
  INNER JOIN users u ON u.id = uat.user_id
  WHERE uat.is_active = true and u.username = :userName
  limit 1
  `,
    { userName }
  );

  return data;
}

/**
 * Returns all a list of all the users in the application.
 *
 * @returns { username: string; id: string }[]
 */
export async function getAllUsersData(): Promise<{ username: string; id: string }[]> {
  const data = await knex.raw<{ username: string; id: string }[]>(
    `
  SELECT 
    username,
    id
  FROM users
  `
  );

  return data;
}
