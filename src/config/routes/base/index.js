const express = require('express');
const app = express();

const userRoutes = require('../user/userRoutes');

app.use('/user', userRoutes);

module.exports = app;

