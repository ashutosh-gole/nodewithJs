const Mongoose = require('mongoose');

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
Mongoose.set('useFindAndModify', false);
Mongoose.set('useCreateIndex', true);

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