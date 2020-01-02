const express = require('express');
const app = express();
const passport = require('passport');
const session = require("express-session");

const userRoutes = require('../user/userRoutes');
const userTypeRoutes = require('../userType/userTypeRoutes');

const utility = require('../../passport/utility');

app.use('/user', userRoutes);
app.use('/user-type', userTypeRoutes);
// app.use('/auth', authRoutes);

app.use(session({ secret: process.env.GOOGLE_CLIENT_SECRET, resave: true, saveUninitialized: true }));
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
utility(passport);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    })
);

module.exports = app;