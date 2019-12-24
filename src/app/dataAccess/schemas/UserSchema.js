const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    image: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
    type: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    introduction: {
        type: String,
    },
    age: {
        type: String,
    },
    interestedIn: {
        type: String,
    },
    educationLevel: {
        type: String,
    },
    majorIndustry: {
        type: String,
    },
    profession: {
        type: String,
    },
    yearsOfExperience: {
        type: String,
    },
    salt: {
        type: String
    },
    token: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)