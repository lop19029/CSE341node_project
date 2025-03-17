require('dotenv').config();
const path = require('path');

/************ Andres ****************/
const mongoose = require('mongoose')

const express = require('express');

const bodyParser = require('body-parser');

const session = require('express-session');

/************ Andres ****************/
const MongoDBStore = require('connect-mongodb-session')(session);

const csrf = require('csurf');

const flash = require('connect-flash');

const app = express();

const csrfProtection = csrf();

app.set('view engine', 'ejs');

app.set('views', 'views');

const PublicRoutes = require('./routes/public');

const AuthRoutes = require('./routes/auth');

/*********** Andres  ***************/
const User = require('./models/user');

const MONGODB_URI =process.env.MONGODB_URI;

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );

  app.use(csrfProtection);
  //Use Flash Messages
  app.use(flash());
  
  app.use((req, res, next) => {
      res.locals.isAuthenticated = req.session.isLoggedIn;
      res.locals.isAdded = req.session.isAdded;
      res.locals.sending = req.session.sending;
      res.locals.updateAgenda = req.session.updateAgenda;
      res.locals.csrfToken = req.csrfToken();  
      next();
    });
    app.use((req, res, next) => {
      // throw new Error('Sync Dummy');
      if (!req.session.user) {
        return next();
      }
      User.findById(req.session.user._id)
        .then(user => {
          if (!user) {
            return next();
          }
          req.user = user;
          res.locals.name = user.uName;
          res.locals.mail = user.email;
          res.locals.idUser = user._id;
          //console.log("user._id: " + user._id);
          next();
        })
        .catch(err => {
          next(new Error(err));
        });
    });
app.use('/auth', AuthRoutes);
app.use(PublicRoutes);

// app.use((error, req, res, next) => {
//     res.status(500).render('template', {
//         pageTitle: 'Error de Validación',
//         PagetoLoad: '500',
//         SocialLinks: {
//             Facebook: "https://www.facebook.com/",
//             Twitter: "https://twitter.com/",
//             WhatsApp: "https://api.whatsapp.com/send?phone=593",
//             Phone: "tel:+99999999999",
//             Instagram: "https://www.instagram.com/",
//             Youtube: "https://www.youtube.com/",
//             Email: "mailto:@",
//             Copyright: "https://sacredplanner.xyz/"
//         }
//     });
//   });
/************ Andres ****************/
mongoose
.connect(MONGODB_URI)
.then(result => {
  app.listen(process.env.APP_PORT);
  console.log('Connected to Data base')
})
.catch(err => {
  console.log(err);
});
