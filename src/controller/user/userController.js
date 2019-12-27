const userBusiness = require('../../app/business/user/userBusiness');

module.exports = {

    signup: function (request, response) {
        const user = request.body;
        userBusiness.signup(user, (err, res) => {
            err ? response.send(err) : response.send(res)
        });
    },

    login: function (request, response) {
        const { email, password } = request.body;
        userBusiness.login(email, password, (err, res) => {
            err ? response.send(err) : response.send(res)
        });
    },

    logout: function (request, response) {
        const { token } = request.body;
        userBusiness.logout(token, (err, res) => {
            err ? response.send(err) : response.send(res)
        });
    },

    userVerify: function (request, response) {
        const { verficationToken } = request.params;
        userBusiness.userVerify(verficationToken, (err, res) => {
            err ? response.send(err) : response.send(res)
        });
    }

}