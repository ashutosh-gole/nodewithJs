const express = require('express');
const app = express();

const userRoutes = require('../user/userRoutes');
const userTypeRoutes = require('../userType/userTypeRoutes');
const studentRoutes = require('../student/studentRoutes');

app.use('/user', userRoutes);
app.use('/user-type', userTypeRoutes);
app.use('/student', studentRoutes);

module.exports = app;