
const UserController = require("./../../../controller/user/userController");

const router = require("express").Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

module.exports = router;