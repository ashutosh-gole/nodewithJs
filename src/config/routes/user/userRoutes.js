
const UserController = require("./../../../controller/user/userController");

const router = require("express").Router();
router.get('/test', (req, res) => {
    res.json("Sucess");
})
router.post('/create', UserController.create);

module.exports = router;