const studentBusiness = require('../../app/business/student/studentBusiness');

module.exports = {

    addStudent: function (request, response) {
        const student = request.body;
        studentBusiness.addStudent(student, (err, res) => {
            err ? response.send(err) : response.send(res)
        });
    },

    getAllStudents: function (request, response) {
        studentBusiness.getAllStudents((err, res) => {
            err ? response.send(err) : response.send(res)
        });
    },

    getStudentById: function (request, response) {
        const { id } = request.params;
        studentBusiness.getStudentById(id, (err, res) => {
            err ? response.send(err) : response.send(res)
        });
    }

}