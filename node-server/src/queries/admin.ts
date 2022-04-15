import Context from 'domains/misc/Context';
import UserTypes from '../enums/UserTypes';
import { getAllUsersData } from '../models/User';
import { getAllFoods } from '../models/UserConsumedFoods';
import AdminUserFood from 'domains/responses/AdminUserFood';

/**
 * Returns all the food entries in the app. Only accessible for admin users.
 *
 * @param {*} parent
 * @param {} params
 * @param {Context} context
 * @returns {Promise<AdminUserFood[]>}
 */
export async function allFoodEntries(
  parent: any,
  params: {},
  context: Context
): Promise<AdminUserFood[]> {
  if (!context.user) {
    throw new Error('Token has expired or is invalid');
  }

  if (context.user.role !== UserTypes.ADMIN) {
    return [];
  }

  const data = await getAllFoods();

  return data;
}

/**
 * Returns a list of all the users in application
 *
 * @param {*} parent
 * @param {} params
 * @param {Context} context
 * @returns {Promise<AdminUserFood[]>}
 */
export async function getAllUser(parent: any, params: {}, context: Context): Promise<any[]> {
  if (!context.user) {
    throw new Error('Token has expired or is invalid');
  }

  if (context.user.role !== UserTypes.ADMIN) {
    return [];
  }

  const data = await getAllUsersData();

  return data;
}
