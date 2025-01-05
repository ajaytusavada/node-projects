const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `type Query { ZXt
      hello: String
      users: [User]
    }
     
     type User {
      id: ID
      name: String
      username: String
      email: String
      address: Address
      phone: String
      website: String
      company: Company
    }

    type Address {
      street: String
      suite: String
      city: String
      zipcode: String
    }

    type Company {
      name: String
      catchPhrase: String
      bs: String
    }`,
    resolvers: {
      Query: {
        hello: () => "Hello, world!",
        users: async () => {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          return response.data;
        },
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(8000, () => console.log("Serevr Started at PORT 8000"));
}

startServer();
