/********Alexander ********/
const socialLinks = {
  Facebook: "https://www.facebook.com/",
  Twitter: "https://twitter.com/",
  WhatsApp: "https://api.whatsapp.com/send?phone=593",
  Phone: "tel:+99999999999",
  Instagram: "https://www.instagram.com/",
  Youtube: "https://www.youtube.com/",
  Email: "mailto:@",
  Copyright: "https://Sites.MarBust.com"
}
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const { validationResult } = require('express-validator/check');

// Transporter
const transporter = nodemailer.createTransport({
    host: "mail.domain",
    port: 465,
    secure: true,
    auth: {
        user: "email@domain", // generated ethereal user
        pass: "password" // generated ethereal password
    }
});

//Login
exports.getLogin = (req, res, next) => {
  res.render('template', {
      pageTitle: 'Login',
      PagetoLoad: 'auth/login',
      SocialLinks: socialLinks
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  console.log(email);
  const password = req.body.password;
  console.log(password);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('template', {
      PagetoLoad: 'auth/login',
      pageTitle: 'Login',
      SocialLinks: socialLinks,
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password
      },
      validationErrors: errors.array()
    });
  }

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        
        return res.status(422).render('template', {
          PagetoLoad: 'auth/login',
          pageTitle: 'Login',
          SocialLinks: socialLinks,
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email: email,
            password: password
          },
          validationErrors: []
        });
      }
      bcrypt
        .compare(password, user.password)
         .then(doMatch => {
          
          if (doMatch) {
            console.log("Login correcto");
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.name = user.uName;
            console.log(user.uName);
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          return res.status(422).render('template', {
            PagetoLoad: 'auth/login',
            pageTitle: 'Login',
            SocialLinks: socialLinks,
            errorMessage: 'Invalid email or password.',
            oldInput: {
              email: email,
              password: password
            },
            validationErrors: []
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};