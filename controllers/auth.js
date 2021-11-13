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
const { validationResult } = require('express-validator');

// Transporter
const transporter = nodemailer.createTransport({
    host: "mail.sacredplanner.xyz",
    port: 465,
    secure: true,
    auth: {
        user: "nodemailer@sacredplanner.xyz", // generated ethereal user
        pass: "mTtBAXRdEf" // generated ethereal password
    }
});

//Login
exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
      message = message[0];
  } else {
      message = null;
  }
  res.render('template', {
      pageTitle: 'Login',
      PagetoLoad: 'auth/login',
      SocialLinks: socialLinks,
      errorMessage: message,
      oldInput: {
          mail: '',
          password: '',
      },
      validationErrors: []
  });
};

exports.postLogin = (req, res, next) => {
  const {
    mail,
    password,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('template', {
            pageTitle: 'Login',
            PagetoLoad: 'auth/login',
            SocialLinks: socialLinks,
            errorMessage: errors.array()[0].msg,
            oldInput: {
                mail: mail,
                password: password
            },
            validationErrors: errors.array()
        });
    }
    //Add function to login
    User.findOne({ email: mail })
        .then(user => {
            console.log(`User: ${user}`);
        if (!user) {
            return res.status(422).render('template', {
            pageTitle: 'Login',
            PagetoLoad: 'auth/login',
            SocialLinks: socialLinks,
            errorMessage: 'Invalid email or password.',
            oldInput: {
                mail: mail,
                password: password
            },
            validationErrors: errors.array()
            });
        }
        bcrypt
        .compare(password, user.password)
        .then(doMatch => {
            console.log(doMatch);
            if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                req.session.name = user.uName;
                console.log(user.uName);
                return req.session.save(err => {
                    //console.log(err);
                    console.log("Successful login")
                    res.redirect('/');
                });
            }
            return res.status(422).render('template', {
                pageTitle: 'Login',
                PagetoLoad: 'auth/login',
                SocialLinks: socialLinks,
                errorMessage: 'Invalid email or password.',
                oldInput: {
                    mail: mail,
                    password: password
                },
                validationErrors: errors.array()
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

// Ends
    /*transporter.sendMail({
            to: 'contact@sacredplanner.xyz', //Please add your personal email where you'll receive the contact form response
            from: mail,
            subject: 'Login | ' + mail,
            html: `
        <h1 style='text-align: center;'>Formulario de Contacto</h1>
        <hr>
    <ul style='line-height: 2em;'>
    <li><strong>Correo:</strong> <a href="mailto:${mail}">${mail}</a></li>
    <li><strong>Password:</strong> ${password}</li>
    </ul>
    <hr>
    <p style='text-align: center;'><strong>Form made with Marbust Websites&reg;'s Technology under the Marbust Technology Company License</strong></p>
    `
        }).then(function (success) {
            req.flash('error', 'Mensaje Enviado Correctamente!');
            res.redirect('/auth/login');
        })
        .catch(err => {
            console.log(`Error-email: ${err}`);
            /*const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });*/
};


  //Logout 
exports.getLogout = (req, res, next) => {
    req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};



//Signup
exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('template', {
        pageTitle: 'Signup',
        PagetoLoad: 'auth/signup',
        SocialLinks: socialLinks,
        errorMessage: message,
        oldInput: {
            name: '',
            mail: '',
            password: '',
            rPassword: ''
        },
        validationErrors: []
    });
  };

//Signup
exports.postSignup = (req, res, next) => {
    const {
        uName,
        mail,
        password,
        rPassword
    } = req.body;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('template', {
            pageTitle: 'Signup',
            PagetoLoad: 'auth/signup',
            SocialLinks: socialLinks,
            errorMessage: errors.array()[0].msg,
            oldInput: {
                uName: uName,
                mail: mail,
                password: password,
                rPassword: rPassword
            },
            validationErrors: errors.array()
        });
      };
  
      bcrypt.hash(password, 12)
          .then(hashedPassword => {
              const user = new User({
                  uName: uName,
                  email: mail,
                  password: hashedPassword
              });
              return user.save();
          })
          .then(result => {
              console.log("Succesfully signed up");
              res.redirect('/auth/login');
              transporter.sendMail({
                  to: 'marcoantonio@marbust.com, alexandre@byui.edu, cas18057.byui.edu, lop19029@byui.edu', //Please add your personal email where you'll receive the contact form response
                  from: mail,
                  subject: 'Formulario de Contactos | ' + uName,
                  html: `
              <h1 style='text-align: center;'>Formulario de Contacto</h1>
              <hr>
          <ul style='line-height: 2em;'>
          <li><strong>Nombre:</strong> ${uName}</li>
          <li><strong>Correo:</strong> <a href="mailto:${mail}">${mail}</a></li>
          </ul>
          <hr>
          <p style='text-align: center;'><strong>Form made with Marbust Websites&reg;'s Technology under the Marbust Technology Company License</strong></p>
          `
              }).then(function (success) {
                  req.flash('error', 'Mensaje Enviado Correctamente!');
                  res.redirect('/signup');
              })
              .catch(err => {
                  const error = new Error(err);
                  error.httpStatusCode = 500;
                  return next(error);
                });
          })
          .catch(err => {
              const error = new Error(err);
              error.httpStatusCode = 500;
              return next(error);
            });
  }
  

//Recover Password
exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
      message = message[0];
  } else {
      message = null;
  }
  res.render('template', {
      pageTitle: 'Reset',
      PagetoLoad: 'auth/reset',
      SocialLinks: socialLinks,
      errorMessage: message,
      oldInput: {
          mail: '',
          password: '',
      },
      validationErrors: []
  });
};

exports.postReset = (req, res, next) => {
  const {
    mail
} = req.body;

const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(422).render('template', {
        pageTitle: 'Reset',
        PagetoLoad: 'auth/reset',
        SocialLinks: socialLinks,
        errorMessage: errors.array()[0].msg,
        oldInput: {
            mail: mail
        },
        validationErrors: errors.array()
    });
}
//Add function to Reset Password


// Ends
transporter.sendMail({
        to: 'contact@sacredplanner.xyz', //Please add your personal email where you'll receive the contact form response
        from: mail,
        subject: 'Reset Password | ' + mail,
        html: `
    <h1 style='text-align: center;'>Formulario de Contacto</h1>
    <hr>
<ul style='line-height: 2em;'>
<li><strong>Correo:</strong> <a href="mailto:${mail}">${mail}</a></li>
</ul>
<hr>
<p style='text-align: center;'><strong>Form made with Marbust Websites&reg;'s Technology under the Marbust Technology Company License</strong></p>
`
    }).then(function (success) {
        req.flash('error', 'Please review your Inbox or Spam!');
        res.redirect('/auth/reset');
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};