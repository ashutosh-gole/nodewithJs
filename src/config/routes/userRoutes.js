const router = require("express").Router();

const UserController = require("../../controller/user/userController");

/**
 * @swagger
 * definitions:
 *   User:
 *     required:
 *       - username
 *     properties:
 *       username:
 *         type: string
 *       path:
 *         type: string
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: All about /user
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Register User
 *     description: Register user with info
 *     tags: [User]
 *     parameters:
 *       - name: username
 *         description: User's name
 *         in: formData
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success add user
 */
router.post("/signup", UserController.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login User
 *     description: For user Login
 *     tags: [User]
 *     parameters:
 *       - name: username
 *         description: User's name
 *         in: formData
 *         type: string
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success add user
 */
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/user-verify/:verficationToken", UserController.userVerify);

module.exports = router;
