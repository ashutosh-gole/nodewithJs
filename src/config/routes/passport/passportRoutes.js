const router = require("express").Router();
const passport = require('passport');
const session = require("express-session");
const utility = require("../../passport/utility");
const path = require('path');
const template = require('../../../config/middlewares/templates/googleTemplate');

router.use(session({ secret: process.env.GOOGLE_CLIENT_SECRET, resave: true, saveUninitialized: true }));
// Initialize Passport and restore authentication state, if any, from the session.
router.use(passport.initialize());
router.use(passport.session());
utility(passport);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/user-type/all-user-types' }), (req, res) => {
        // console.log(res.req.user);
        // res.json(res.req.user);
        res.redirect('/auth/google/success');
    }

    // passport.authenticate('google', {
    //     successRedirect: '/auth/google/success',
    //     failureRedirect: '/auth/google/failure'
    // })   
);

router.get('/auth/google/success', (req, res) => {
    // console.log(req.res.req.user);
    
    res.send(template.googleTemplate(req.res.req.user));
    // res.sendFile(path.join(__dirname + '/data.html'))
});

router.get('/auth/google/failure', (req, res) => {
    res.sendFile(path.join(__dirname + '/data.html'))
});

module.exports = router;