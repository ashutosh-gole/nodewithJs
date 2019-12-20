const userRepository = require('../../repository/user/userRepository');
module.exports = {
    create: (user, callback) => {
        console.log(user)
        userRepository.create(user, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    }
}