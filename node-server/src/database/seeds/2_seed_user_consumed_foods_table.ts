import Knex from 'knex';
import * as uuid from 'uuid';

import TABLES from '../../constants/tables';

export async function seed(knex: Knex): Promise<any> {
  return knex(TABLES.USER_CONSUMED_FOODS).then(() => {
    // Inserts seed entries
    return knex(TABLES.USER_CONSUMED_FOODS).insert([
      {
        id: uuid.v4(),
        user_id: '2',
        name: 'Pizza',
        calorie_count: 200,
        food_taken_on_date: '2022-01-16',
        food_taken_on_time: '01:16',
        price: 20,
      },
      {
        id: uuid.v4(),
        user_id: '2',
        name: 'Ham Burger',
        calorie_count: 400,
        food_taken_on_date: '2022-01-16',
        food_taken_on_time: '08:16',
        price: 60,
      },
      {
        id: uuid.v4(),
        user_id: '2',
        name: 'Steak',
        calorie_count: 1000,
        food_taken_on_date: '2022-01-17',
        food_taken_on_time: '12:16',
        price: 150,
      },
      {
        id: uuid.v4(),
        user_id: '3',
        name: 'Chips',
        calorie_count: 200,
        food_taken_on_date: '2022-01-13',
        food_taken_on_time: '09:26',
        price: 29,
      },
      {
        id: uuid.v4(),
        user_id: '3',
        name: 'Beans',
        calorie_count: 100,
        food_taken_on_date: '2022-01-15',
        food_taken_on_time: '08:16',
        price: 78,
      },
    ]);
  });
}
