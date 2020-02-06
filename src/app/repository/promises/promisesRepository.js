const promisesSchema = require('../../dataAccess/schemas/PromisesSchema');

module.exports = {

    create: function (userType) {
        return new Promise((resolve, reject) => {
            promisesSchema.create(userType)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

}