const async = require('async');
const crypto = require('crypto');
const UserSchema = require('../../dataAccess/schemas/UserSchema');
const utility = require('../../../config/middlewares/utility');
const template = require('../../../config/middlewares/templates/userVerifyTemplate');

module.exports = {
    signup: function (user, callback) {
        console.log("user info===========================",user);
        async.waterfall([
            (done) => {
                UserSchema.create(user, (err, res) => {
                    err ? done(err, null) : done(null, res)
                });
            },
            (prevRes, done) => {
                const verificationToken = crypto.randomBytes(16).toString('hex');
                UserSchema.findOneAndUpdate({ _id: prevRes._id }, { verificationToken: verificationToken }, { new: true }, (err, res) => {
                    err ? done(err, null) : null;
                    if (res) {
                        const mailOptions = {
                            from: process.env.EMAIL, // sender address
                            to: prevRes.email, // list of receivers
                            subject: 'Account Verification Request', // Subject line
                            html: template.userVerifyTemplate(res)// plain text body
                        };

                        utility.sendMail(mailOptions, (err, res) => {
                            err ? done(err, null) : done(null, prevRes)
                        });
                    } else {
                        done('Some issue on update', null)
                    }
                })

            }
        ], (err, resp) => {
            err ? callback(err, null) : callback(null, resp)
        })
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
    },
}