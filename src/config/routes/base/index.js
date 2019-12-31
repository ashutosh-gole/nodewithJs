const express = require('express');
const app = express();

// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

const docsRoutes = require('../swagger/index');
const userRoutes = require('../user/userRoutes');
const userTypeRoutes = require('../userType/userTypeRoutes');

// const UserSchema = require('../../../app/dataAccess/schemas/UserSchema')
// const TestSchema = require('../../../app/dataAccess/schemas/TestSchema')

// // Swagger set up
// const options = {
//     swaggerDefinition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Time to document that Express API you built",
//             version: "1.0.0",
//             description:
//                 "A test project to understand how easy it is to document and Express API",
//             license: {
//                 name: "MIT",
//                 url: "https://choosealicense.com/licenses/mit/"
//             },
//             contact: {
//                 name: "Swagger",
//                 url: "https://swagger.io",
//                 email: "Info@SmartBear.com"
//             }
//         },
//         servers: [
//             {
//                 url: "http://localhost:5000"
//             }
//         ]
//     },
//     apis: ["./././app/dataAccess/schemas/TestSchema.js","./index.js"]
// };

// const swaggerDocument = swaggerJsdoc(options);
// const swaggerDocument = require('../../../../swagger.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

app.use('/docs', docsRoutes);
app.use('/user', userRoutes);
app.use('/user-type', userTypeRoutes);

module.exports = app;