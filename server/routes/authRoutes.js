let express = require('express');
const ragistrationController = require('../controllers/authControllers/ragistrationController');
const loginController = require('../controllers/authControllers/loginController');
const verificationController = require('../controllers/authControllers/verificationController');
const refreshController = require('../controllers/authControllers/refreshController');
const forgotPasswordController = require('../controllers/authControllers/forgotPasswordController');
const resetPasswordController = require('../controllers/authControllers/resetPasswordController');
let router = express.Router()


/**
 * @swagger
 *  - tags:
 *      name: Auth Apis 
 *      description: Authentication APIs
 */ 

/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: Use for register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post('/registration', ragistrationController)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Use for login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/login', loginController)

/**
 * @swagger
 * /auth/verify/:token:
 *   post:
 *     summary: Use for verify user 
 *     tags: [Auth]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The verify user token received via email
 *     responses:
 *       201:
 *         description: Account verified successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/verify/:token', verificationController)


/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Use for generate access token using refresh token
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: Token generated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/refresh', refreshController)

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Use for forgot password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Email sent successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/forgot-password', forgotPasswordController )

/**
 * @swagger
 * /auth/reset-password/:token:
 *   post:
 *     summary: Use for reset password
 *     tags: [Auth]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The password reset token received via email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/reset-password/:token', resetPasswordController )

module.exports = router 

