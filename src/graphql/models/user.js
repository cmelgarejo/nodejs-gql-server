import graphql from 'graphql'
import axios from 'axios'

const {
  GraphQLObjectType, GraphQLString, GraphQLInt
} = graphql

const getUsers = async (id, sort) => {
  const get = await axios.get(`https://jsonplaceholder.typicode.com/users${id ? `/${id}` : ''}`)
  if (get.status === 200) {
    let res = Array.isArray(get.data) ? get.data : [get.data]
    if (sort) {
      res = res.sort((a, b) => {
        return sort === 'ASC' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      })
    }
    return res
  }
}

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    name: {
      type: GraphQLString
    }
  }
})

export { userType, getUsers }
