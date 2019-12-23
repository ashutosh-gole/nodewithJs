const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt:{
        type: String
    },
    token: {
        type: String
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)