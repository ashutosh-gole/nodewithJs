const userTypeRepository = require('../../repository/userType/userTypeRepository');

module.exports = {

    create: function (userType, callback) {
        userTypeRepository.create(userType, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    },

    getAllUserTypes: function (callback) {
        userTypeRepository.getAllUserTypes((err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    }

}