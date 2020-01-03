const router = require("express").Router();
const passport = require('passport');
const session = require("express-session");
const utility = require("../../passport/utility");

router.use(session({ secret: process.env.GOOGLE_CLIENT_SECRET, resave: true, saveUninitialized: true }));
// Initialize Passport and restore authentication state, if any, from the session.
router.use(passport.initialize());
router.use(passport.session());
utility(passport);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    })
);

router.get('/auth/google/success', (req, res) => {
    res.send(JSON.stringify('successufully login'))
});
router.get('/auth/google/failure', (req, res) => {
    res.send(JSON.stringify('login failed'))
});

module.exports = router;