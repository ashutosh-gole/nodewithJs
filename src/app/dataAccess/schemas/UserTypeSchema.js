const Mongoose = require('mongoose');

const UserTypeSchema = Mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
}, {
    timestamps: true
});

module.exports = Mongoose.model('UserType', UserTypeSchema)