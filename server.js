const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./MealRoutes");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

require("dotenv").config();

mongoose.set("strictQuery", false);

const PORT = 4001 || process.env.port;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_LINK)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => console.log("Error"));

app.use(routes);

// Swagger setup
const swaggerDefinition = YAML.load("./swagger.yaml");

const options = {
  swaggerDefinition,
  apis: ["./MealRoutes.js"], // Path to the API routes file
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
