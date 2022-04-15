import Knex from 'knex';

import LoggedInUser from '../responses/User';

interface Context {
  db: Knex;
  error: any;
  token: string;
  user: LoggedInUser;
}

export default Context;
