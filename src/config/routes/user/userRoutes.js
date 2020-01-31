const router = require("express").Router();

const UserController = require("../../../controller/user/userController");

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/user-verify/:verficationToken', UserController.userVerify);

module.exports = router;