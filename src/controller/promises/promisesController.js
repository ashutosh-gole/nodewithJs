const promisesBusiness = require('../../app/business/promises/promisesBusiness');

module.exports = {

    executeAll: function (request, response) {

        const user = request.body;
        const promise1 = promisesBusiness.create(user)

        const promise2 = Promise.resolve(3);

        const promise4 = Promise.resolve(1);

        const promise3 = new Promise((resolve, reject) => {
            setTimeout(resolve, 200, 'foo');
        });

        Promise.all([promise1, promise2, promise3,promise4])
            .then((values) => {
                console.log(values);
                response.send(values);
            })
            .catch((err) => {
                response.send(err);
                console.log(err);
            })
    }
}