// const router = require("express").Router();
// const passport = require('passport');

// const utility = require("../../passport/passport");

// router.get('/google',
//     passport.authenticate('google', {
//         scope: [
//             'https://www.googleapis.com/auth/plus.login',
//             'https://www.googleapis.com/auth/plus.profile.emails.read'
//         ]
//     })
// );
// router.get('/google/callback',
//     passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res) => {
//         res.redirect('/login');
//     });

// module.exports = router;