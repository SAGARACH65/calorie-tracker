import Knex from 'knex';
import * as uuid from 'uuid';

import TABLES from '../../constants/tables';

export async function seed(knex: Knex): Promise<void> {
  return knex(TABLES.USER_ACCESS_TOKENS).then(() => {
    // Inserts seed entries
    return knex(TABLES.USER_ACCESS_TOKENS).insert([
      {
        id: uuid.v4(),
        user_id: '1',
        access_token: 'xx508xx63817x752xx74004x30705xx92x58349x5x78f5xx34xxxxx51',
        is_active: 1,
      },
      {
        id: uuid.v4(),
        user_id: '2',
        access_token: '628x9x0xx447xx4x421x517x4x474x33x2065x4x1xx523xxxxx6x7x20',
        is_active: 1,
      },
      {
        id: uuid.v4(),
        user_id: '3',
        access_token: '72jndska67k0xx447xx4x4215x4x1xx523xxxxx6x7x20x4x474x33x20',
        is_active: 1,
      },
      {
        id: uuid.v4(),
        user_id: '3',
        access_token: '123456789',
        is_active: 0,
      },
    ]);
  });
}
