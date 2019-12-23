const async = require('async');
const crypto = require('crypto');

const userRepository = require('../../repository/user/userRepository');
module.exports = {
    signup: function(user, callback){
                console.log(this);
                
                const encryptedValues = this.saltHashPassword(user.password);
                user.password = encryptedValues.password;
                user.salt = encryptedValues.salt;
                userRepository.signup(user, (err, res) => {
                    err ? callback(err, null) : callback(null, res)
                });
    },
    

    saltHashPassword : function(password) {
        const salt = this.getSalt();
        return this.hashPasswordWithSalt(password, salt);
    },

    getSalt: function() {
        console.log(process.env.SALT_LENGTH);
        
        return crypto.randomBytes(Number(process.env.SALT_LENGTH)).toString('Hex');
    },

    hashPasswordWithSalt: function(password, salt) {

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