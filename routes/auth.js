const express = require('express');
const User = require('../models/user');


//const authPublic = require('../controllers/public')
const {
    check,
    body
} = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', 
[
body('mail', 'Please enter a valid email address.')
.isEmail()
.normalizeEmail(),
body('password', 'Password must be at least 5 characters long.')
.isString()
.isLength({
    min: 5
})
],
authController.postLogin);

router.get('/signup', authController.getSignup);

router.post('/signup',
[
body('uName', 'The name field must be at least 3 characters long.')
.isString()
.isLength({
    min: 3
})
.trim(),
body('mail')
.isEmail()
.custom((value, {req}) => {
        return User.findOne({email: value}) //check repeated users
            .then(userDoc => {
                if(userDoc) {
                    console.log("A user with that e-mail already exists.")
                   return Promise.reject(
                       'A user with that e-mail already exists.'
                   );
                }
            });
    })
.normalizeEmail(),
body('password', 'Password must be at least 5 characters long.')
.isString()
.isLength({
    min: 5
}),
body('rPassword','Passwords have to match')
.custom((value, {req}) => {
    if (value !== req.body.password) {
        throw new Error ('Passwords have to match');
    }
    return true;
})
],
authController.postSignup);


/**************** Andres ********************/
// logout
router.post('/logout', authController.postLogout);


//Reset
router.get('/reset', authController.getReset);

router.post('/reset', 
[
body('mail', 'Please enter a valid email address.')
.isEmail()
.normalizeEmail()
],
authController.postReset);

//router.post('/logout', authController.postLogout);

module.exports = router;

/**************** Tiago ********************/

router.get('/reset', authController.getReset);