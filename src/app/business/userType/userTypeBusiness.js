const userTypeRepository = require('../../repository/userType/userTypeRepository');

module.exports = {

    create: function (userType) {
        return new Promise((resolve, reject) => {
            userTypeRepository.create(userType)
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
            userTypeRepository.getAllUserTypes()
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

}