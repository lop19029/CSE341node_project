
// Imports 
const express = require('express');
const User = require('../models/user');
const {
    check,
    body
} = require('express-validator');

//controlers
const router = express.Router();
const publicController = require('../controllers/public');
const agendaController = require('../controllers/agenda');
const isAuth = require('../middleware/is-auth');


//Home
router.get('/', publicController.getIndex);
// render agenda page
router.get('/agendas', isAuth, agendaController.getAgendas);
//Display agenda by id
router.get('/view-agenda/:agendaId', isAuth, agendaController.getAgenda);

//add agendas 
router.get('/add-agenda', isAuth, agendaController.getAddAgenda);

router.post('/add-agenda',
// validation add agenda 
[
body('meetingDay', 'Please Enter the date of the meeting.')
.isString()
.isLength({
    min: 1
}),

body('presiding', 'Please Enter who presides the meeting.')
.isString()
.isLength({
    min: 1
}),

body('leading', 'Please Enter who leads the meeting.')
.isString()
.isLength({
    min: 1
}),

body('authorities', 'Invalid Imput.')
.isString(),

body('pPlayer', 'Please Enter the name of the Pianist.')
.isString(),

body('mDirector', 'Please Enter the music director.')
.isString(),

body('fHymn', 'Please fist hymn.')
.isString()
.isLength({
    min: 1
}),

body('fPrayer', 'Please enter opening prayer/convocation.')
.isString()
.isLength({
    min: 1
}),

body('wAffairs', 'Invalid Input')
.isString(),

body('sHymn', 'Please Enter the second hymn.')
.isString()
.isLength({
    min: 1
}),

body('fSpeaker', 'Imput')
.isString(),

body('fTopic', 'Invalid Imput.')
.isString(),

body('sSpeaker', 'Invalid Imput.')
.isString(),

body('sTopic', 'Invalid Imput.')
.isString(),

body('tSpeaker', 'Invalid Imput.')
.isString(),

body('tTopic', 'Invalid Imput.')
.isString(),


body('lHymn', 'Please Enter last Hymn.')
.isString()
.isLength({
    min: 1
}),

body('lPrayer', 'Please Enter closing Prayer.')
.isString()
.isLength({
    min: 1
}),


body('meetingKind',)
.isString(),


],
isAuth, agendaController.postAddAgenda);

//edit agenda
router.get('/edit-agenda/:agendaId', isAuth, agendaController.getEditAgenda);
router.post('/edit-agenda', isAuth, agendaController.postEditProduct);

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