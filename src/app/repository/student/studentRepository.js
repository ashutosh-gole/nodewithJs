const StudentSchema = require('../../dataAccess/schemas/StudentSchema');

module.exports = {

    addStudent: function (student, callback) {
        StudentSchema.create(student, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    },

    getAllStudents: function (callback) {
        StudentSchema.find({}, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    }

}