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
const buffer = require('buffer');
const crypto = require('crypto');
global.emailPost = "inicio";
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
    <p style='text-align: center;'><strong>The Sacred Planner Team &reg;</strong></p>
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
          .then (result => {
              req.session.isAdded = true;
              console.log("Succesfully signed up");
              res.redirect ('/auth/login');
              
              transporter.sendMail({
                  to: mail, //Please add your personal email where you'll receive the contact form response
                  from: 'contact@sacredplanner.xyz',
                  subject: 'Welcome ' + uName + ' to The Sacred Planner Tool',
                  html: `
              <h1 style='text-align: center;'>Welcome to the Sacred Planner Tool</h1>
              <hr>
          <ul style='line-height: 2em;'>
          <li><strong>Your Name:</strong> ${uName}</li>
          <li><strong>Your Email:</strong> <a href="mailto:${mail}">${mail}</a></li>
          </ul>
          <hr>
          <p style='text-align: center;'><strong>The Sacred Planner Team&reg;</strong></p>
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
            req.session.isAdded = false;
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
    const { mail } = req.body;
    emailPost = req.body.mail;
    
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          console.log(err);
          return res.redirect('/reset');
        }
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
    const token = buffer.toString('hex');
    //console.log("token: " + token);
    User.findOne({ email: req.body.mail })
      .then(user => {
        if (!user) {
          req.flash('error', 'No account with that email found.');
          return res.redirect('/auth/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        //res.redirect('/');
        transporter.sendMail({
          to: req.body.mail,
          from: 'contact@sacredplanner.xyz',
          subject: 'Password reset!',
          html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="https://sacredplanner.xyz/auth/reset/${token}">link</a> to set a new password.</p>
        `
        }).then(function (success) {
            req.flash('error', 'Please review your Inbox or Spam!');
            res.redirect('/auth/reset');
        }).catch(err => {
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
    });

}
exports.getNewPassword = (req, res, next) => {
    console.log("dentro de getnewpassword");
    const errors = validationResult(req);
    const token = req.params.token;
    
    

    User.findOne({ email: emailPost, resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
      .then(user => {
        let message = req.flash('error');
        if (message.length > 0) {
          message = message[0];
        } else {
          message = null;
        }
        res.status(422).render('template', {
          pageTitle: 'New Password',
          PagetoLoad: 'auth/new-password',
          SocialLinks: socialLinks,
          errorMessage: message,
          userId: user._id.toString(),
          passwordToken: token
        });
        
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };
 
  exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    
    
    const passwordToken = req.body.passwordToken;
    console.log("newPassword: " + newPassword);
    console.log("userIdk: " + userId);
    console.log("passwordToken: " + passwordToken);

    let resetUser;
    
    User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId
    })
      .then(user => {
         
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
      })
      .then(hashedPassword => {
        console.log("dentro de hashedpass");  
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
      })
      .then(result => {
        res.redirect('/auth/login');
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };
