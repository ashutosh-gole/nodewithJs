const express = require('express');
const app = express();

const userRoutes = require('../user/userRoutes');
const userTypeRoutes = require('../userType/userTypeRoutes');
const twilioRoutes = require('../twilio/twilioRoutes');

app.use('/user', userRoutes);
app.use('/user-type', userTypeRoutes);
app.use('/twilio', twilioRoutes);

module.exports = app;