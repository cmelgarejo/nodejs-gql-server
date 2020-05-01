import restify from 'restify'
import graphqlHTTP from 'express-graphql'
import schema from './graphql/schema.js'

const server = restify.createServer()

server.get('/', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

server.post('/', graphqlHTTP({
  schema: schema
}))

server.listen(4000)
