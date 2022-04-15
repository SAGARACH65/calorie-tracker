import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add USER_CONSUMED_FOODS table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(TABLES.USER_CONSUMED_FOODS, (table: Knex.CreateTableBuilder) => {
    table.string('id').primary();
    table.string('user_id').references('id').inTable(TABLES.USERS).notNullable();

    table.string('name').notNullable();
    table.integer('calorie_count').notNullable();
    table.string('food_taken_on_date');
    table.string('food_taken_on_time');
    table.integer('price');

    table.timestamps(true, true);
  });
}

/**
 * Drop USER_CONSUMED_FOODS table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLES.USER_CONSUMED_FOODS);
}
