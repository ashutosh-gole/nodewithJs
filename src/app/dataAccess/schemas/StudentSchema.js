const Mongoose = require('mongoose');

const StudentSchema = Mongoose.Schema({
    name: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = Mongoose.model('Student', StudentSchema);