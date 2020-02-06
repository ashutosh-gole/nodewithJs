const Mongoose = require('mongoose');

const PromisesSchema = Mongoose.Schema({
    name: {
        type: String,
        // unique: true,
        required: true
    }
}, {
    timestamps: true
});

module.exports = Mongoose.model('Promises', PromisesSchema)