const userTypeBusiness = require('../../app/business/userType/userTypeBusiness');

module.exports = {
    create: function (request, response) {
        const userType = request.body;
        userTypeBusiness.create(userType, (err, res) => {
            err ? response.send(err) : response.send(res)
        });
    }
}