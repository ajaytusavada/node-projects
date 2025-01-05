const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { sequelize } = require("./config/database");
const { typeDefs, resolvers } = require("./graphql/schema");
const cors = require("cors");
require("dotenv").config();

sequelize.sync().then(() => console.log("Database synced"));

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  const app = express();

  app.use("/graphql",cors(),express.json(),expressMiddleware(server));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}/graphql`));
};

startApolloServer();
