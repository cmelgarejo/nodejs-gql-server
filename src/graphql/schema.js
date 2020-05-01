import graphql from 'graphql'
import { userType, getUsers } from './models/user.js'
import { todoType, getTodos } from './models/todo.js'

const {
  GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList
} = graphql

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    todos: {
      type: new GraphQLList(todoType),
      args: {
        id: { type: GraphQLInt },
        sort: { type: GraphQLString },
        startsWith: { type: GraphQLString }
      },
      resolve: async (source, { id, sort, startsWith }) => {
        return getTodos(id, sort, startsWith)
      }
    },
    users: {
      type: new GraphQLList(userType),
      args: {
        id: { type: GraphQLInt },
        sort: { type: GraphQLString }
      },
      resolve: async (source, { id, sort }) => {
        return getUsers(id, sort)
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType
})

export default schema
