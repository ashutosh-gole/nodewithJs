const userBusiness = require('../../app/business/user/userBusiness');
module.exports = {
    signup: function(request, response) {
        console.log(request.body);
        
        const user = request.body;
        userBusiness.signup(user, (err, res) => {
            err ? response.send(err) : response.send(res)
        });
    },

    login: function(request, response) {
        const {email, password} = request.body;
        userBusiness.login(email, password, (err, res) => {
            err ? response.send(err) : response.send(res)
        });
    },
}