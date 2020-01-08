const Mongoose = require('mongoose');

const StudentSchema = Mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    email: {
        type: String,
    },
    class: {
        type: String,
    },
    collegeName: {
        type: String,
    },
    phone: {
        type: String,
    },
    city: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = Mongoose.model('Student', StudentSchema);