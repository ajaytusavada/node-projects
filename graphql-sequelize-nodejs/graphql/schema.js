const { gql } = require("graphql-tag");
const User = require("../models/user");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    users: async () => await User.findAll(),
    user: async (_, { id }) => await User.findByPk(id),
  },
  Mutation: {
    addUser: async (_, { name, email }) => await User.create({ name, email }),
    updateUser: async (_, { id, name, email }) => {
      const user = await User.findByPk(id);
      if (user) {
        await user.update({ name, email });
        return user;
      }
      throw new Error("User not found");
    },
    deleteUser: async (_, { id }) => {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        return user;
      }
      throw new Error("User not found");
    },
  },
};

module.exports = { typeDefs, resolvers };
