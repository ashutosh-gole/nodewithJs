const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    username: String,
    address: String,
    city: String,
    mob: Number    
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)