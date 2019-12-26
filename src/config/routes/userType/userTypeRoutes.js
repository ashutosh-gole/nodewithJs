const UserTypeController = require('../../../controller/userType/userTypeController');
const router = require("express").Router();

router.post('/create', UserTypeController.create);
router.get('/all-user-types', UserTypeController.getAllUserTypes);

module.exports = router;