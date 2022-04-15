import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import knex from './config/knex';
import { getTokenFromHeaders } from './authenticator';
import { validateToken } from './middlewares/validateToken';

dotenv.config({
  path: '../.env',
});

const server = new ApolloServer({
  schema,

  // Context is used for adding details of a user each request.
  context: async ({ req }) => {
    let token = null;
    let data;

    try {
      const headerResponse = getTokenFromHeaders(req);

      if (headerResponse.token) {
        token = headerResponse.token;

        data = await validateToken(token);
      }

      if (headerResponse.error) {
        data = headerResponse;
      }
    } catch (e) {
      // Just logging for now. We can add a dedicated logger here later
      console.warn(`Unable to authenticate using auth token: ${token}`);

      // throw (e)
    }

    return {
      token,
      ...data,
      db: knex,
    };
  },
  playground: process.env.NODE_ENV !== 'production',
  debug: process.env.NODE_ENV !== 'production',
  formatError: (err) => {
    // Don't give the specific errors to the client.
    if (err.message.startsWith('Database Error: ') || err.message.startsWith('connect')) {
      return new Error('Internal server error');
    }

    // Otherwise return the original error. The error can also
    // be manipulated in other ways, so long as it's returned.
    return err;
  },
});

const app = express();

console.log({app})

app.use(cors());

server.applyMiddleware({ app, path: '/graphql' });
// server.applyMiddleware({app:(...params)=>{
//   console.log({params})
// }})

const { API_PORT = 5002 } = process.env;

// Start the server
app.listen({ port: API_PORT }, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:${API_PORT}${server.graphqlPath}`);
});
