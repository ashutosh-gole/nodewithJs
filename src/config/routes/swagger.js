const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "swagger-express-jsdoc", // Title (required)
      version: "3.0.0" // Version (required)
    }
  },
  apis: [`${__dirname}/*.js`],
  basePath: "/" // Base path (optional)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
