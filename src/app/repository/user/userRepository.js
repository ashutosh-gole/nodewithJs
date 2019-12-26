const UserSchema = require('../../dataAccess/schemas/UserSchema');

module.exports = {
    signup: function (user, callback) {
        console.log(user)
        UserSchema.create(user, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    },

    findByEmail: function (email, callback) {
        console.log(email)
        UserSchema.findOne({ email: email }, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    },

    updateUser: function (userId, token, callback) {
        UserSchema.findOneAndUpdate({ _id: userId }, { token: token }, { new: true }, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        })
    },

    logout: function (token, callback) {
        UserSchema.findOneAndUpdate({ token: token }, { $unset: { token: 1 } }, { new: true }, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        })
    }
}