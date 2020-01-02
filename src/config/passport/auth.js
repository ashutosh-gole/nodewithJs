module.exports = {

    'googleAuth': {
        'clientID': process.env.GOOGLE_CLIENT_ID,
        'clientSecret': process.env.GOOGLE_CLIENT_SECRET,
        'callbackURL': 'http://localhost:5000/auth/google/callback'
    },

    'facebookAuth': {
        'clientID': 'your-secret-clientID-here',
        'clientSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:5000/auth/facebook/callback'
    },

    'twitterAuth': {
        'clientID': 'your-consumer-key-here',
        'clientSecret': 'your-client-secret-here',
        'callbackURL': 'http://localhost:5000/auth/twitter/callback'
    }

};