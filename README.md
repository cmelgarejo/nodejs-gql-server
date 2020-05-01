# nodejs-gql-server

Opinionated Node.JS GraphQL server using:

- express-graphql

This graphql server proxies [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a proof of concept

- List of all TODOs
- Single TODO by id
- List all TODOs sorted by title (`sort: "ASC"` or `"DESC"` as argument)
- List all TODOs with title starting with a given string, i.e: all TODOs starting with `startsWith: “aut”`
- You can mix filters for all TODOs (even the single TODO by id, if the TODO doesn't `startsWith` with whatever string set, will return an empty array)

## Example queries

```graphql
query todos {
  todos(sort: "DESC", startsWith: "e") {
    id
    title
    completed
  }
}

query todosSortedASC {
  todos(sort: "ASC") {
    id
    title
    completed
  }
}

query todosStartsWith {
  todos(startsWith: "e") {
    id
    title
    completed
  }
}

query todosSortedDescAndStartsWith {
  todos(sort: "DESC", startsWith: "a") {
    id
    title
    completed
  }
}

query onePost {
  todos(id: 99) {
    id
    title
    completed
    user {
      id
      name
    }
  }
}

query oneUser {
  users(id: 1) {
    id
    name
  }
}
```
