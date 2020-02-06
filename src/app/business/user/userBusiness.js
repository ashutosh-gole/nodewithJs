const async = require('async');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

const userRepository = require('../../repository/user/userRepository');
const utility = require('../../../config/middlewares/utility');
const template = require('../../../config/middlewares/templates/userVerifyTemplate');

module.exports = {

    signup: function (user) {
        return new Promise((resolve, reject) => {
            const encryptedValues = this.saltHashPassword(user.password);
            user.password = encryptedValues.password;
            user.salt = encryptedValues.salt;
            userRepository.signup(user)
                .then((res) => {
                    return res;
                })
                .then((prevRes) => {
                    userRepository.verifyUserToken(prevRes)
                        .then((verifyRes) => {
                            if (verifyRes) {
                                const mailOptions = {
                                    from: process.env.EMAIL, // sender address
                                    to: prevRes.email, // list of receivers
                                    subject: 'Account Verification Request', // Subject line
                                    html: template.userVerifyTemplate(verifyRes)// plain text body
                                };

                                utility.sendMail(mailOptions)
                                    .then((res) => {
                                        resolve(prevRes);
                                    })
                                    .catch((err) => {
                                        reject(err);
                                    })

                            } else {
                                reject(`Some issue on update`);
                            }
                        })
                        .catch((verifyErr) => {
                            reject(verifyErr);
                        })
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    login: function (email, password) {
        return new Promise((resolve, reject) => {
            userRepository.findByEmail(email)
                .then((res) => {
                    if (res) {
                        return res;
                    }
                    else {
                        resolve(`User not found`);
                    }
                })
                .then((preRes) => {
                    const encryptedValues = this.hashPasswordWithSalt(password, preRes.salt);
                    if (encryptedValues.password == preRes.password) {
                        console.log('Correct Password');
                        const payload = { _id: preRes._id };
                        const options = { expiresIn: '1d', issuer: 'nodewithjs' };
                        const secret = process.env.JWT_SECRET;
                        const token = jwt.sign(payload, secret, options);
                        userRepository.updateUser(preRes._id, token)
                            .then((finalRes) => {
                                resolve(finalRes);
                            })
                            .catch((err) => {
                                reject(`User not found`);
                            })
                    } else {
                        resolve(`Incorrect Password`);
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    logout: async function (token) {
        return await userRepository.logout(token)
    },

    userVerify: async function (token) {
        return await userRepository.userVerify(token)
    },

    saltHashPassword: function (password) {
        const salt = this.getSalt();
        return this.hashPasswordWithSalt(password, salt);
    },

    getSalt: function () {
        return crypto.randomBytes(Number(process.env.SALT_LENGTH)).toString('Hex');
    },

    hashPasswordWithSalt: function (password, salt) {
        let hashedPassword = crypto.createHmac('sha512', salt);
        hashedPassword.update(password);
        hashedPassword = hashedPassword.digest('Hex');
        const encryptedValues = {
            salt: salt,
            password: hashedPassword
        };
        return encryptedValues;
    }

}