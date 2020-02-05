const async = require('async');
const crypto = require('crypto');

const UserSchema = require('../../dataAccess/schemas/UserSchema');

module.exports = {

    signup: function (user) {
        return new Promise((resolve, reject) => {
            UserSchema.create(user)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    verifyUserToken: function (user) {
        return new Promise((resolve, reject) => {
            const verificationToken = crypto.randomBytes(16).toString('hex');
            UserSchema.findOneAndUpdate({ _id: user._id }, { verificationToken: verificationToken }, { new: true })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    findByEmail: function (email) {
        return new Promise((resolve, reject) => {
            UserSchema.findOne({ email: email })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    updateUser: function (userId, token) {
        return new Promise((resolve, reject) => {
            UserSchema.findOneAndUpdate({ _id: userId }, { token: token }, { new: true })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    logout: function (token) {
        return new Promise((resolve, reject) => {
            UserSchema.findOneAndUpdate({ token: token }, { $unset: { token: 1 } }, { new: true })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    userVerify: function (verificationToken) {
        return new Promise((resolve, reject) => {
            UserSchema.findOne({ verificationToken: verificationToken })
                .then((res) => {
                    if (res) {
                        res.verificationToken = null;
                        res.isVerified = true;
                        res.save()
                            .then((ress) => {
                                resolve(`User Verified`);
                            })
                            .catch((errr) => {
                                reject(errr);
                            })
                    } else {
                        reject(`User Already Verified`)
                    }
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

}