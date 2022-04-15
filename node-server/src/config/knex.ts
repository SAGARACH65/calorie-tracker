import Knex from 'knex';
import * as dotenv from 'dotenv';

import { toCamelCase, toSnakeCase } from '../utils/object';

dotenv.config({
  path: '../.env',
});

const config = {
  client: process.env.DB_CLIENT,
  connection: {
    charset: 'utf8',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  postProcessResponse: ({ rows }: { rows: any[] }) => {
    if (Array.isArray(rows)) {
      return rows.map((row) => toCamelCase(row));
    }

    return toCamelCase(rows);
  },
  wrapIdentifier: (value: string, origImpl: any) => {
    if (value !== '*') {
      return origImpl(toSnakeCase(value));
    }

    return value;
  },
};

/**
 * Database connection.
 */
export default Knex(config);
