const express = require('express');
const app = express();

const userRoutes = require('../user/userRoutes');
const userTypeRoutes = require('../userType/userTypeRoutes');
const authRoutes = require('../passport/passportRoutes');
const localRoutes = require('../passport/localRoutes');

app.use('/user', userRoutes);
app.use('/user-type', userTypeRoutes);
app.use('/', authRoutes);
app.use('/', localRoutes);

module.exports = app;