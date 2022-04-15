import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolverMap';

const typeDefs = importSchema('./src/schema/schema.graphql');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
