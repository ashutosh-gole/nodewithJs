const promisesRepository = require('../../repository/promises/promisesRepository');

module.exports = {

    create: function (userType) {
        return new Promise((resolve, reject) => {
            promisesRepository.create(userType)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
    
}