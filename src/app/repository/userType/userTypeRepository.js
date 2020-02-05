const UserTypeSchema = require('../../dataAccess/schemas/UserTypeSchema');

module.exports = {

    create: function (userType) {
        return new Promise((resolve, reject) => {
            UserTypeSchema.create(userType)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },

    getAllUserTypes: function () {
        return new Promise((resolve, reject) => {
            UserTypeSchema.find({})
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

}