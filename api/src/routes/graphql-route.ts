import {
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';

import UserService from '../services/user.service';

/**
 * https://github.com/graphql/graphql-js/blob/16.x.x/src/__tests__/starWarsValidation-test.ts
 */

const userInterface: GraphQLInterfaceType = new GraphQLInterfaceType({
  name: 'IUserType',
  resolveType: () => {
    return 'UserType';
  },
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    username: { type: GraphQLString },
    nickname: { type: GraphQLString },
    address: { type: GraphQLString },
  }),
});

const userType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    username: { type: GraphQLString },
    nickname: { type: GraphQLString },
    address: { type: GraphQLString },
  }),
  interfaces: [userInterface],
});

const queryType = new GraphQLObjectType({
  name: 'UserQuery',
  fields: () => ({
    user: {
      type: userInterface,
      args: {
        address: {
          type: GraphQLString,
        },
      },
      resolve: (_source, { address }) => {
        const userService = new UserService();
        return userService.queryByAddress(address);
      },
    },
  }),
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const userSchema: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  types: [userInterface, userType],
});

export const graphqlUserRoute = createHandler({
  schema: userSchema,
});
