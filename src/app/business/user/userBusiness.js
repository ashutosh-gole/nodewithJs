const async = require('async');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userRepository = require('../../repository/user/userRepository');
const utility = require('../../../config/middlewares/utility');
const template = require('../../../config/middlewares/templates/userVerifyTemplate');

module.exports = {

    // signup: function (user, callback) {
    //     async.waterfall([
    //         (done) => {
    //             const encryptedValues = this.saltHashPassword(user.password);
    //             user.password = encryptedValues.password;
    //             user.salt = encryptedValues.salt;
    //             userRepository.signup(user, (err, res) => {
    //                 err ? done(err, null) : done(null, res)
    //             });
    //         },
    //         (prevRes, done) => {
    //             userRepository.verifyUserToken(prevRes, (err, res) => {
    //                 err ? done(err, null) : null;
    //                 if (res) {
    //                     const mailOptions = {
    //                         from: process.env.EMAIL, // sender address
    //                         to: prevRes.email, // list of receivers
    //                         subject: 'Account Verification Request', // Subject line
    //                         html: template.userVerifyTemplate(res)// plain text body
    //                     };

    //                     utility.sendMail(mailOptions, (err, res) => {
    //                         err ? done(err, null) : done(null, prevRes)
    //                     });
    //                 } else {
    //                     done('Some issue on update', null)
    //                 }
    //             });
    //         }
    //     ], (err, resp) => {
    //         err ? callback(err, null) : callback(null, resp)
    //     })
    // },

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

    // login: function (email, password, callback) {
    //     async.waterfall([
    //         (done) => {
    //             userRepository.findByEmail(email, (err, res) => {
    //                 err ? done(err, null) : null;
    //                 res ? done(null, res) : done('User not found', null)
    //             })
    //         },
    //         (preRes, done) => {
    //             const encryptedValues = this.hashPasswordWithSalt(password, preRes.salt);
    //             if (encryptedValues.password == preRes.password) {
    //                 console.log('Correct Password');
    //                 const payload = { _id: preRes._id };
    //                 const options = { expiresIn: '1d', issuer: 'nodewithjs' };
    //                 const secret = process.env.JWT_SECRET;
    //                 const token = jwt.sign(payload, secret, options);
    //                 userRepository.updateUser(preRes._id, token, (err, res) => {
    //                     err ? done(err, null) : null;
    //                     res ? done(null, res) : done('User not found', null)
    //                 })
    //             } else {
    //                 done('Incorrect Password', null)
    //             }
    //         }
    //     ], (error, resp) => {
    //         error ? callback(error, null) : callback(null, resp)
    //     })
    // },

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

    logout: function (token) {
        return new Promise((resolve, reject) => {
            userRepository.logout(token)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    userVerify: function (token) {
        return new Promise((resolve, reject) => {
            userRepository.userVerify(token)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
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