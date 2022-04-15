import HttpStatus from 'http-status-codes';
import { ApolloError } from 'apollo-server-express';

import { en } from '../lang/en-us';
import { getUserDataFromToken } from '../models/User';

/**
 * Middleware for validating tokens
 *
 * @param {token} string
 * @returns {Promise<any>}
 */
export async function validateToken(token: string): Promise<any> {
  try {
    const verifiedUser = await getUserDataFromToken(token);

    if (!verifiedUser) {
      throw new ApolloError(en.TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED.toString());
    }

    return { user: verifiedUser };
  } catch (error) {
    return { error };
  }
}
