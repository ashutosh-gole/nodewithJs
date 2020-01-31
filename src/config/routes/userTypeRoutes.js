const router = require("express").Router();

const UserTypeController = require("../../controller/userType/userTypeController");

/**
 * @swagger
 * tags:
 *   name: UserType
 *   description: All about /user-type
 */

/**
 * @swagger
 * /user-type/create:
 *   post:
 *     summary: Add UserType
 *     description: Add userType
 *     tags: [UserType]
 *     parameters:
 *       - name: name
 *         description: User's name
 *         in: body
 *         type: string
 *         required: true
 *     consumes:
 *      - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success add user
 */
router.post("/create", UserTypeController.create);

/**
 * @swagger
 * /user-type/all-user-types:
 *   get:
 *     summary: Add User Type
 *     description: Add user Type
 *     tags: [UserType]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success add user
 */
router.get("/all-user-types", UserTypeController.getAllUserTypes);

module.exports = router;
