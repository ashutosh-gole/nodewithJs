const router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const path = require("path");
const template = require("../../../config/middlewares/templates/userVerifyTemplate");

const localUtility = require("../../passport/localUtility");
const UserSchema = require('../../../app/dataAccess/schemas/UserSchema');

// Initialize Passport and restore authentication state, if any, from the session.
router.use(passport.initialize());
router.use(passport.session());
localUtility(passport);

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        (email, password, callback) => {
            UserSchema.findOne({ email: email }, (err, user) => {
console.log(user);

                if (err) {
                    return callback(err);
                }

                if (!user) {
                    return callback(null, false, { message: 'Incorrect email.' });
                }

                // if (!user.validPassword(password)) {
                //     return callback(null, false, { message: 'Incorrect password.' });
                // }

                return callback(null, user);
            });
        }
    )
);

router.post(
    '/local/login',
    passport.authenticate('local', {
        failureRedirect: "/local/login/failure"
    }),
    (req, res) => {
        // console.log("#####################################################\n\n", req), "\n\n";
        // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&\n", res);
        // res.json(res.req.user);
        res.redirect("/local/login/success");
    }
);

router.get("/local/login/success", (req, res) => {
    // console.log(req.res.req.user);

    res.send(template.userVerifyTemplate(req.res.req.user));
    // res.sendFile(path.join(__dirname + '/data.html'))
});

router.get("/local/login/failure", (req, res) => {
    console.log("resresresresresresresres", res);
    console.log("reqreqreqreqreqreqreqreq", req);
    // res.sendFile(path.join(__dirname + "/data.html"));
});


module.exports = router;
