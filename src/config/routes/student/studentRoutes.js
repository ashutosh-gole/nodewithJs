const router = require("express").Router();

const studentController = require("../../../controller/student/studentController");

router.post('/add-student', studentController.addStudent);
router.get('/get-all-students', studentController.getAllStudents);
// router.get('/get-student-by-id', studentController.getStudentById);
// router.put('/update-student-by-id', studentController.updateStudentById);
// router.delete('/delete-student-by-id', studentController.deleteStudentById);

module.exports = router;