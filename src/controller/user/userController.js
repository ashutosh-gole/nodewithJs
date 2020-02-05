const userBusiness = require('../../app/business/user/userBusiness');

module.exports = {

    signup: function (request, response) {
        const user = request.body;
        userBusiness.signup(user)
            .then((res) => {
                response.send(res)
            })
            .catch((err) => {
                response.send(err)
            })
    },

    login: function (request, response) {
        const { email, password } = request.body;
        userBusiness.login(email, password)
            .then((res) => {
                response.send(res)
            })
            .catch((err) => {
                response.send(err)
            })
    },

    logout: function (request, response) {
        const { token } = request.body;
        userBusiness.logout(token)
            .then((res) => {
                response.send(res)
            })
            .catch((err) => {
                response.send(err)
            })
    },

    userVerify: function (request, response) {
        const { verficationToken } = request.params;
        userBusiness.userVerify(verficationToken)
            .then((res) => {
                response.send(res)
            })
            .catch((err) => {
                response.send(err)
            })
    }

}