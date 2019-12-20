const UserSchema = require('../../dataAccess/schemas/UserSchema');
module.exports = {
    create: (user, callback) => {
        console.log(user)
        UserSchema.create(user, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    }
}