const { ApolloServer } = require("apollo-server");
const { Category } = require("./resolvers/Category");
const { Product } = require("./resolvers/Product");
const { Query } = require("./resolvers/Query");
const { Mutation } = require('./resolvers/Mutation')
const { typeDefs } = require("./schema");
const { db } = require("./db");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Product,
    Mutation
  },
  context: {
    db
  },
});

server.listen().then(({ url }) => {
  console.log("Server listen to" + url);
});
