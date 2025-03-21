const socialLinks = {
    Facebook: process.env.FACEBOOK,
    Twitter: process.env.TWITTER,
    WhatsApp: process.env.WHATSAPP,
    Phone: process.env.PHONE,
    Instagram: process.env.INSTAGRAM,
    Youtube: process.env.YOUTUBE,
    Email: process.env.EMAIL,
    Copyright: process.env.COPYRIGHT
  }
const User = require('../models/user');
//Validator of Inputs
const {
    validationResult
} = require('express-validator');

///////////////NodeMailer//////////////////////////////////
//const bcrypt = require('bcryptjs');
//const nodemailer = require('nodemailer');


//////////////////Ends/////////////////////////////////////



//Home
exports.getIndex = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/auth/login');
    }
    res.render('template', {
        pageTitle: 'Home',
        PagetoLoad: 'home',
        SocialLinks: socialLinks
    });
};


//About
exports.getAgendas = (req, res, next) => {
    res.render('template', {
        pageTitle: 'Agendas',
        PagetoLoad: 'agendas',
        SocialLinks: socialLinks
    });
};

//Login
/*exports.getLogin = (req, res, next) => {
    res.render('template', {
        pageTitle: 'Login',
        PagetoLoad: 'login',
        SocialLinks: socialLinks
    });
  };*/



//Contact
exports.getContact = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('template', {
        pageTitle: 'Contact',
        PagetoLoad: 'contact',
        SocialLinks: socialLinks,
        errorMessage: message,
        oldInput: {
            name: '',
            mail: '',
            phone: '',
            formMessage: ''
        },
        validationErrors: []
    });
};

//Post Contact
exports.postContact = (req, res, next) => {
    const {
        name,
        mail,
        phone,
        formMessage
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('template', {
            pageTitle: 'Contact',
            PagetoLoad: 'contact',
            SocialLinks: socialLinks,
            errorMessage: errors.array()[0].msg,
            oldInput: {
                name: name,
                mail: mail,
                phone: phone,
                formMessage: formMessage
            },
            validationErrors: errors.array()
        });
    }
    transporter.sendMail({
            to: 'xxxxxxxx@xxxxxx.xxxxx', //Please add your personal email where you'll receive the contact form response
            from: mail,
            subject: 'Formulario de Contactos | ' + name,
            html: `
        <h1 style='text-align: center;'>Formulario de Contacto</h1>
        <hr>
    <ul style='line-height: 2em;'>
    <li><strong>Nombre:</strong> ${name}</li>
    <li><strong>Correo:</strong> <a href="mailto:${mail}">${mail}</a></li>
    <li><strong>Teléfono:</strong> ${phone}</li>
    <li><strong>Mensaje:</strong> ${formMessage}</li>
    </ul>
    <hr>
    <p style='text-align: center;'><strong>Form made with Marbust Websites&reg;'s Technology under the Marbust Technology Company License</strong></p>
    `
        }).then(function (success) {
            req.flash('error', 'Mensaje Enviado Correctamente!');
            res.redirect('/contact');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

//Get 500
exports.get500 = (req, res, next) => {
    res.render('template', {
        pageTitle: 'Error de Validación',
        PagetoLoad: '500',
        SocialLinks: socialLinks
    });
};



//404
exports.use404 = (req, res, next) => {
    res.status(404).render('template', {
        pageTitle: 'Page Not Found',
        PagetoLoad: '404',
        SocialLinks: socialLinks
    });
};

//500
exports.use500 = (req, res, next) => {
    res.status(500).render('template', {
        pageTitle: 'Error de Validación',
        PagetoLoad: '500',
        SocialLinks: socialLinks
    });
};