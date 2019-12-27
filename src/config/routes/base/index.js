const express = require('express');
const app = express();

const userRoutes = require('../user/userRoutes');
const userTypeRoutes = require('../userType/userTypeRoutes');

app.use('/user', userRoutes);
app.use('/user-type', userTypeRoutes);

module.exports = app;