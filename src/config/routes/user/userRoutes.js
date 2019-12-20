
const express = require("express");
const UserController = require("./../../../controller/user/userController");

const router = express.Router();

router.post('/create', UserController.create);

module.exports = router;