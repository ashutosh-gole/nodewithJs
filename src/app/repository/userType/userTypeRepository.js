const UserTypeSchema = require('../../dataAccess/schemas/UserTypeSchema');

module.exports = {

    create: async function (userType) {
        return await UserTypeSchema.create(userType)
    },

    getAllUserTypes: async function () {
        return await UserTypeSchema.find({})
    }

}