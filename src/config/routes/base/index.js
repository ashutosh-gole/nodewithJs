const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");

const userRoutes = require("../userRoutes");
const userTypeRoutes = require("../userTypeRoutes");
const swaggerSpec = require("../swagger");

app.use("/user", userRoutes);
app.use("/user-type", userTypeRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
module.exports = app;
