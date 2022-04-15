import Context from 'domains/misc/Context';
import { getUserToken } from '../models/User';
import UserTypes from '../enums/UserTypes';
import UpdateFoodEntry from '../domains/requests/UpdateFoodEntry';
import AdminAddFoodEntry from '../domains/requests/AdminAddFoodEntry';
import {
  addUserFood,
  deleteUserFood,
  adminAddUserFood,
  editUserFood,
} from '../models/UserConsumedFoods';

/**
 * This is a kind of authenticator function. It would generally take email and password but for the demo project we just return the user token
 *
 * @param {*} parent
 * @param {{userName:string}} params
 * @param {Context} context
 * @returns {Promise<void>}
 */
export async function getUserTokenFromUserName(
  parent: any,
  params: { userName: string },
  context: Context
): Promise<{ id: string; userToken: string; role: string }> {
  const data = await getUserToken(params.userName);

  return { id: params.userName, userToken: data?.accessToken || '', role: data?.role || '' };
}

/**
 * Add user food entry based on params
 *
 * @param {*} parent
 * @param {} params
 * @param {Context} context
 * @returns {Promise<void>}
 */
export async function addUserFoodEntry(
  parent: any,
  params: UpdateFoodEntry,
  context: Context
): Promise<void> {
  if (!context.user) {
    throw new Error('Token has expired or is invalid');
  }
  await addUserFood(params, context.user.id);
}

/**
 * Adds a user food entry for a admin
 * @param {*} parent
 * @param {AdminAddFoodEntry} params
 * @param {Context} context
 * @returns {Promise<void>}
 */
export async function adminAddUserFoodEntry(
  parent: any,
  params: AdminAddFoodEntry,
  context: Context
): Promise<void> {
  if (!context.user) {
    throw new Error('Token has expired or is invalid');
  }

  if (context.user.role !== UserTypes.ADMIN) {
    throw new Error('Unauthorized to make this action');
  }

  await adminAddUserFood(params);
}

/**
 * Deletes a user food entry
 *
 * @param {*} parent
 * @param {{entryId:string}} params
 * @param {Context} context
 * @returns {Promise<void>}
 */
export async function deleteUserFoodEntry(
  parent: any,
  params: { entryId: string },
  context: Context
): Promise<void> {
  if (!context.user) {
    throw new Error('Token has expired or is invalid');
  }

  await deleteUserFood(params.entryId);
}

/**
 * Edits a user food entry based on params
 *
 * @param {*} parent
 * @param {UpdateFoodEntry} params
 * @param {Context} context
 * @returns {Promise<void>}
 */
export async function editFoodEntry(
  parent: any,
  params: UpdateFoodEntry,
  context: Context
): Promise<void> {
  if (!context.user) {
    throw new Error('Token has expired or is invalid');
  }

  await editUserFood(params);
}
