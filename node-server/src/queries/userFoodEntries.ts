import Context from 'domains/misc/Context';
import UserFood from 'domains/responses/UserFood';
import { getUserFood } from '../models/UserConsumedFoods';

/**
 * Query for fetching the user food entries
 *
 * @param {*} parent
 * @param {} params
 * @param {Context} context
 * @returns {Promise<UserFood>}
 */
export async function getUserFoodEntries(
  parent: any,
  params: {},
  context: Context
): Promise<UserFood[]> {
  if (!context.user) {
    throw new Error('Token has expired or is invalid');
  }

  const data = await getUserFood(context.user.id);

  return data;
}
