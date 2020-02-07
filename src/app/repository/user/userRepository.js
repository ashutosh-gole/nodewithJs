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

    userVerify: async function (verificationToken) {
        try {
            let res = await UserSchema.findOne({ verificationToken: verificationToken })

            if (res) {
                res.verificationToken = null;
                res.isVerified = true;

                let finalRes = await res.save()
                if (finalRes != null) {
                    return `User Verified`;
                } else {
                    return Promise.reject(`Error`);
                }
            } else {
                return `User Already Verified`;
            }

        } catch (err) {
            return err;
        }
    }

}