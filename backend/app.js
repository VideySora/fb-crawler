const express = require("express");
const app = express();
const cors = require("cors");
const projectRouter = require("./controllers/projectcontroller");
const grouppageRouter = require("./controllers/grouppagecontroller");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

// Connect to database
const url =
  "mongodb+srv://namkha:namkha@fbcrawlercluster.dr1okg4.mongodb.net/?retryWrites=true&w=majority";
console.log("connecting to", url);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api", projectRouter);
app.use("/api", grouppageRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;