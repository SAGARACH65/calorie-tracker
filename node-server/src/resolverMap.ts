import { IResolvers } from 'graphql-tools';

import Query from './queries';
import Mutation from './mutations';

const resolverMap: IResolvers = {
  Query,
  Mutation,
};

export default resolverMap;
