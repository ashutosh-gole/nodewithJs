const express = require('express');
const app = express();

const userRoutes = require('../user/userRoutes');
const userTypeRoutes = require('../userType/userTypeRoutes');
const promisesExRoutes = require('../promises/promisesRoutes');

app.use('/user', userRoutes);
app.use('/user-type', userTypeRoutes);
app.use('/promises', promisesExRoutes);

module.exports = app;