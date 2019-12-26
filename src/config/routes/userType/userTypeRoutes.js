const UserTypeController = require('../../../controller/userType/userTypeController');
const router = require("express").Router();

router.post('/create', UserTypeController.create);

module.exports = router;