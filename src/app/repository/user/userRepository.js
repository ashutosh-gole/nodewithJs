const async = require('async');
const crypto = require('crypto');

const UserSchema = require('../../dataAccess/schemas/UserSchema');

module.exports = {

    signup: function (user, callback) {
        UserSchema.create(user, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    },

    verifyUserToken: function (user, callback) {
        const verificationToken = crypto.randomBytes(16).toString('hex');
        UserSchema.findOneAndUpdate({ _id: user._id }, { verificationToken: verificationToken }, { new: true }, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    },

    findByEmail: function (email, callback) {
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
    },

    userVerify: function (verificationToken, callback) {
        UserSchema.findOne({ verificationToken: verificationToken }, (err, res) => {
            err ? callback(err, null) : null;
            if (res) {
                res.verificationToken = null;
                res.isVerified = true;
                res.save((error) => {
                    error ? callback(err, null) : callback(null, 'User Verfied')
                })
            } else {
                callback(null, 'User Already Verified')
            }
        })
    }

}