const UserController = require("./../../../controller/user/userController");
const router = require("express").Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/user-verify/:verficationToken', UserController.userVerify);

module.exports = router;