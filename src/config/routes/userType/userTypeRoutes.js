const router = require("express").Router();

const UserTypeController = require('../../../controller/userType/userTypeController');

router.post('/create', UserTypeController.create);
router.get('/all-user-types', UserTypeController.getAllUserTypes);

module.exports = router;