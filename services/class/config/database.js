const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const DB_URI = `${MONGO_URI}/Class`;

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Class");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
