const userTypeBusiness = require('../../app/business/userType/userTypeBusiness');

module.exports = {

    create: function (request, response) {
        const userType = request.body;
        userTypeBusiness.create(userType)
            .then((res) => {
                response.send(res)
            })
            .catch((err) => {
                response.send(err)
            })
    },

    getAllUserTypes: function (request, response) {
        userTypeBusiness.getAllUserTypes()
            .then((res) => {
                response.send(res)
            })
            .catch((err) => {
                response.send(err)
            })
    }

}