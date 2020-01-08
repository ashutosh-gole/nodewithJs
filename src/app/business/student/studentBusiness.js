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
    },

    getStudentById: function (id, callback) {
        studentRepository.getStudentById(id, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    },

    updateStudentById: function (id, student, callback) {
        studentRepository.updateStudentById(id, student, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    },

    deleteStudentById: function (id, callback) {
        studentRepository.deleteStudentById(id, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        });
    }

}