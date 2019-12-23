const async = require('async');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const userRepository = require('../../repository/user/userRepository');
module.exports = {
    signup: function (user, callback) {
        console.log(this);

        const encryptedValues = this.saltHashPassword(user.password);
        user.password = encryptedValues.password;
        user.salt = encryptedValues.salt;
        userRepository.signup(user, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    },

    login: function (email, password, callback) {
        async.waterfall([
            (done) => {
                userRepository.findByEmail(email, (err, res) => {
                    err ? done(err, null) : null;
                    res ? done(null, res) : done('User not found', null)
                })
            },
            (preRes, done) => {
                const encryptedValues = this.hashPasswordWithSalt(password, preRes.salt);
                if (encryptedValues.password == preRes.password) {
                    console.log('Correct Password');
                    const payload = { _id: preRes._id };
                    const options = { expiresIn: '1d', issuer: 'nodewithjs' };
                    const secret = process.env.JWT_SECRET;
                    const token = jwt.sign(payload, secret, options);
                    userRepository.updateUser(preRes._id,token, (err, res) => {
                        err ? done(err, null) : null;
                        res ? done(null, res) : done('User not found', null)
                    })
                } else {
                   done('Incorrect Password', null)
                }
            }
        ], (error, resp) => {
            error ? callback(error, null) : callback(null, resp)
        })
    },


    saltHashPassword: function (password) {
        const salt = this.getSalt();
        return this.hashPasswordWithSalt(password, salt);
    },

    getSalt: function () {
        console.log(process.env.SALT_LENGTH);

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