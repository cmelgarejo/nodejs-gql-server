import graphql from 'graphql'
import axios from 'axios'
import { userType, getUsers } from './user.js'

const {
  GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean
} = graphql

const getTodos = async (id, sort, startsWith) => {
  const get = await axios.get(`https://jsonplaceholder.typicode.com/todos${id ? `/${id}` : ''}`)
  if (get.status === 200) {
    let res = Array.isArray(get.data) ? get.data : [get.data]
    if (sort) {
      res = res.sort((a, b) => {
        return sort === 'ASC' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      })
    }
    if (startsWith) {
      res = res.filter(p => p.title.startsWith(startsWith))
    }
    return res
  }
}

const todoType = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    id: {
      type: GraphQLInt
    },
    userId: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    completed: {
      type: GraphQLBoolean
    },
    user: {
      type: userType,
      resolve: async (todo) => (await getUsers(todo.userId))[0]
    }
  }
})

export { todoType, getTodos }
