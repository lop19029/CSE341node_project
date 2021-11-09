const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
//const User = require('../models/user');

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
    const password = req.body.password;
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          req.flash('error', 'Invalid email or password.');
          return res.redirect('/login');
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save(err => {
                console.log(err);
                res.redirect('/');
              });
            }
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
          })
          .catch(err => {
            console.log(err);
            res.redirect('/login');
          });
      })
      .catch(err => console.log(err));
  };
  