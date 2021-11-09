const express = require('express');

const authController = require('../controllers/auth');
//const authPublic = require('../controllers/public')
const router = express.Router();

router.get('/auth/login', authController.getLogin);


//router.get('/signup', authController.getSignup);

router.post('/auth/login', authController.postLogin);

//router.post('/signup', authController.postSignup);

//router.post('/logout', authController.postLogout);

module.exports = router;