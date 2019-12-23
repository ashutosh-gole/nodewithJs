const userBusiness = require('../../app/business/user/userBusiness');
module.exports = {
    create: (request, response) => {
        const user = request.body;
        userBusiness.create(user, (err, res) => {
            err ? response.send(err) : response.send(res)
        });
    }
}