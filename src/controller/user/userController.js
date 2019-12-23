const userBusiness = require('../../app/business/user/userBusiness');
module.exports = {
    signup: (request, response) => {
        console.log(request.body);
        
        const user = request.body;
        userBusiness.signup(user, (err, res) => {
            err ? response.send(err) : response.send(res)
        });
    }
}