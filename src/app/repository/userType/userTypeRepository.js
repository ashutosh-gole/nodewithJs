const UserTypeSchema = require('../../dataAccess/schemas/UserTypeSchema');

module.exports = {

    create: function (userType, callback) {
        UserTypeSchema.create(userType, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    },

    getAllUserTypes: function (callback) {
        UserTypeSchema.find({}, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    }

}