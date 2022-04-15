import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add game_settings table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(TABLES.USER_ACCESS_TOKENS, (table: Knex.CreateTableBuilder) => {
    table.string('id').primary();

    table.string('user_id').references('id').inTable(TABLES.USERS).notNullable();

    table.string('access_token').notNullable();
    table.boolean('is_active').notNullable().defaultTo(true);

    table.timestamps(true, true);
  });
}

/**
 * Drop game_settings table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLES.USER_ACCESS_TOKENS);
}
