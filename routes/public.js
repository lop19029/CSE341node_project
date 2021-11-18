const express = require('express');
const User = require('../models/user');

const {
    check,
    body
} = require('express-validator');

const publicController = require('../controllers/public');
const router = express.Router();

/**************** Andres ********************/ 
const isAuth = require('../middleware/is-auth');

//Home
router.get('/', publicController.getIndex);
//About
router.get('/agendas', isAuth, publicController.getAgendas);
//Services
router.get('/add-agenda', isAuth, publicController.getAddAgenda);
//Login
//router.get('/login', publicController.getLogin);
//router.post('/auth/login', publicController.postLogin);
//router.get('/signup', authController.getSignup);

/*router.post('/signup',
[
body('uName', 'The name field must be at least 3 characters long.')
.isString()
.isLength({
    min: 3
})
.trim(),
body('mail', 'Please enter a valid email address.')
.isEmail()
// .custom((value, {req}) => {
//         return User.findOne({mail: value}) //check repeated users
//         .then(userDoc => {
//             if(userDoc) {
//                return Promise.reject(
//                    'A user with that e-mail already exists.'
//                );
//             }
//         });
//     })
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
publicController.postSignup);
*/
//Contact
router.get('/contact', publicController.getContact);
//Post Contact
router.post('/contact',
    [
        body('name', 'Por favor ingrese su nombre correctamente.')
        .isString()
        .isLength({
            min: 3
        })
        .trim(),
        body('mail', 'Por favor ingrese su email correctamente.')
        .isEmail()
        .normalizeEmail(),
        body('phone', 'Por favor ingrese su teléfono correctamente.')
        .isNumeric()
        .isLength({
            min: 9
        })
        .trim(),
        body('formMessage', 'Por favor ingrese su mensaje correctamente.')
        .isString()
        .isLength({
            min: 4
        })
    ],
    publicController.postContact);

//500 View
router.get('/500', publicController.get500);

// 404 Not Found
router.use(publicController.use404);
//Errors Handling
router.use(publicController.use500);

module.exports = router;