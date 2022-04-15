import Knex from 'knex';
import * as uuid from 'uuid';

import TABLES from '../../constants/tables';

export async function seed(knex: Knex): Promise<any> {
  return knex(TABLES.USERS).then(() => {
    // Inserts seed entries
    return knex(TABLES.USERS).insert([
      {
        id: '1',
        username: 'admin',
        email: 'admin@test.com',
        first_name: 'Admin',
        last_name: 'User',
        role: 'ADMIN',
        calorie_limit: 2100,
        budget_limit: 1000,
      },
      {
        id: '2',
        username: 'sagar_ach',
        email: 'sagarach65@gmail.com',
        first_name: 'Sagar',
        last_name: 'Acharya',
        role: 'USER',
        calorie_limit: 3000,
        budget_limit: 500,
      },
      {
        id: '3',
        username: 'toptal_user',
        email: 'toptal@toptal.com',
        first_name: 'Toptal',
        last_name: 'User',
        role: 'USER',
        calorie_limit: 2000,
        budget_limit: 1000,
      },
    ]);
  });
}
