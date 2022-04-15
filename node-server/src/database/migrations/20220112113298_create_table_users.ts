import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add users table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  await knex.schema.createTable(TABLES.USERS, (table: Knex.CreateTableBuilder) => {
    table.string('id').primary();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('first_name').nullable();
    table.string('last_name').nullable();
    table.string('role').notNullable().defaultTo('USER');

    // Default value for  user calorie intake is set
    table.integer('calorie_limit').notNullable().defaultTo(2100);
    table.integer('budget_limit').notNullable().defaultTo(1000);

    table.timestamps(true, true);
  });

  await knex.raw(`
  ALTER TABLE ${TABLES.USERS}
    ADD CONSTRAINT user_role_check
    CHECK (role IN ('USER', 'ADMIN'))
`);

  return;
}

/**
 * Drop users table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLES.USERS);
}
