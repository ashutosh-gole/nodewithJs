const GoogleStrategy = require('passport-google-oauth20').Strategy;

const utility = require('./auth');

module.exports = (passport) => {

    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  In a
    // production-quality application, this would typically be as simple as
    // supplying the user ID when serializing, and querying the user record by ID
    // from the database when deserializing.  However, due to the fact that this
    // example does not have a database, the complete Facebook profile is serialized
    // and deserialized.

    passport.serializeUser((user, callback) => {
        callback(null, user);
    });

    passport.deserializeUser((user, callback) => {
        callback(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: utility.googleAuth.clientID,
        clientSecret: utility.googleAuth.clientSecret,
        callbackURL: utility.googleAuth.callbackURL
    },
        (accessToken, refreshToken, profile, callback) => {
            callback(null, {
                profile: profile,
                token: accessToken
            });
        }
    ));

}