const router = require("express").Router();

const promisesController = require("../../../controller/promises/promisesController");

router.post('/execute-all', promisesController.executeAll);

module.exports = router;