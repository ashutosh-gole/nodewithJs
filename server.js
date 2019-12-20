const express = require('express');
require('dotenv').config();

const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;
app.set("port", port);

// all route path
require('./src/config/middlewares/base');

// Db Connection
require('./src/app/dataAccess/dbHelper');

app.listen(port, () => {
    console.log("Node app is running at localhost:" + port);
});
