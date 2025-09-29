let express = require('express');
const ragistrationController = require('../controllers/authControllers/ragistrationController');
const loginController = require('../controllers/authControllers/loginController');
const verificationController = require('../controllers/authControllers/verificationController');
const refreshController = require('../controllers/authControllers/refreshController');
const forgotPasswordController = require('../controllers/authControllers/forgotPasswordController');
const resetPasswordController = require('../controllers/authControllers/resetPasswordController');
let router = express.Router()

router.post('/registration', ragistrationController)
router.post('/login', loginController)
router.get('/verify/:token', verificationController)
router.post('/refresh', refreshController)
router.post('/forgot-password', forgotPasswordController )
router.post('/reset-password/:token', resetPasswordController )

module.exports = router 

