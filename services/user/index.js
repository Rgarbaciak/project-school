require("dotenv").config();
require("./config/database");

const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");

const resolvers = require("./resolvers");
const bodyParser = require("body-parser");

const schema = fs.readFileSync("./schema.graphql", "utf8");
const typeDefs = gql(schema);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: ({ res }) => ({ res }),
});
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

async function startServer() {
  await server.start();
  app.use((req, res, next) => {
    next();
  });

  server.applyMiddleware({ app });
}
app.get("/", (req, res) => {
  res.send("Welcome to the user service");
});

startServer().then(() => {
  const port = 3003;
  app.listen(port, () => {
    console.log(
      `Serveur démarré sur http://localhost:${port}${server.graphqlPath}`
    );
  });
});