const express = require('express');
const app = express();

const userRoutes = require('../user/userRoutes');
const userTypeRoutes = require('../userType/userTypeRoutes');
const authRoutes = require('../passport/passportRoutes');

app.use('/user', userRoutes);
app.use('/user-type', userTypeRoutes);
app.use('/', authRoutes);

module.exports = app;