const studentRepository = require('../../repository/student/studentRepository');

module.exports = {

    addStudent: function (student, callback) {
        studentRepository.addStudent(student, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    },

    getAllStudents: function (callback) {
        studentRepository.getAllStudents((err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    }

}