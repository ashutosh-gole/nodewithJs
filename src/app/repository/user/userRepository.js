const async = require('async');
const crypto = require('crypto');

const UserSchema = require('../../dataAccess/schemas/UserSchema');

module.exports = {

    signup: async function (user) {
        return await UserSchema.create(user)
    },

    verifyUserToken: async function (user) {
        const verificationToken = crypto.randomBytes(16).toString('hex');
        return await UserSchema.findOneAndUpdate({ _id: user._id }, { verificationToken: verificationToken }, { new: true })
    },

    findByEmail: async function (email) {
        return await UserSchema.findOne({ email: email })
    },

    updateUser: async function (userId, token) {
        return await UserSchema.findOneAndUpdate({ _id: userId }, { token: token }, { new: true })
    },

    logout: async function (token) {
        return await UserSchema.findOneAndUpdate({ token: token }, { $unset: { token: 1 } }, { new: true })
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