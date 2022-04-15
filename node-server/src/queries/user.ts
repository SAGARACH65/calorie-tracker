import User from '../domains/responses/User';
import Context from 'domains/misc/Context';

/**
 * Query for fetching the user data.
 *
 * @param {*} parent
 * @param {} params
 * @param {Context} context
 * @returns {Promise<User>}
 */
export function getUser(parent: any, params: {}, context: Context): User {
  return context.user;
}
