const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server-express");
const resolvers = require("./resolvers");

const app = express();

app.use(bodyParser.json());
const schema = fs.readFileSync("./schema.graphql", "utf8");

const typeDefs = gql(schema);

const server = new ApolloServer({ typeDefs, resolvers });

const USER_SERVICE_URL = "http://user-service:3003/graphql";
const CLASS_SERVICE_URL = "http://class-service:3001/graphql";
const GRADE_SERVICE_URL = "http://grade-service:3002/graphql";
const COURSE_SERVICE_URL = "http://course-service:3004/graphql";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

async function callGraphQLService(serviceUrl, reqBody, res) {
  console.log("Request body:", reqBody);

  try {
    const response = await fetch(serviceUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });

    const responseData = await response.text();
    console.log("Response data:", responseData);

    if (!response.ok) {
      throw new Error(`Response failed with status: ${response.status}`);
    }

    const data = JSON.parse(responseData);
    res.json(data);
  } catch (error) {
    console.error("Error in callGraphQLService:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

app.post("/user/graphql", (req, res) => {
  callGraphQLService(USER_SERVICE_URL, req.body, res);
});

app.post("/class/graphql", (req, res) => {
  callGraphQLService(CLASS_SERVICE_URL, req.body, res);
});

app.post("/grade/graphql", (req, res) => {
  callGraphQLService(GRADE_SERVICE_URL, req.body, res);
});

app.post("/course/graphql", (req, res) => {
  callGraphQLService(COURSE_SERVICE_URL, req.body, res);
});

app.get("/", (req, res) => {
  res.send("Welcome to the API Gateway!");
});
async function startServer() {
  await server.start();
  app.use((req, res, next) => {
    next();
  });
  server.applyMiddleware({ app });
}

startServer().then(() => {
  const port = 3005;
  app.listen(port, () => {
    console.log(
      `Serveur démarré sur http://localhost:${port}${server.graphqlPath}`
    );
  });
});
