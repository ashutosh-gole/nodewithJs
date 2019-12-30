const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema({
    profileUrl: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    type: {
        type: Mongoose.Types.ObjectId,
        ref: 'UserType'
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
    interestedIn: [{
        type: String,
    }],
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
    verificationToken: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = Mongoose.model('User', UserSchema)