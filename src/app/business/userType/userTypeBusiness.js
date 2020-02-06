const userTypeRepository = require('../../repository/userType/userTypeRepository');

module.exports = {

    create: async function (userType) {
        return await userTypeRepository.create(userType)
    },

    getAllUserTypes: async function () {
        return await userTypeRepository.getAllUserTypes()
    }

}