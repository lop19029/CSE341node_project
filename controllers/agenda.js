/********************Andres********************* */
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

// Imports   
const mongoose = require('mongoose');
const {
  validationResult
} = require('express-validator');
const Agenda = require('../models/agenda');
const nodemailer = require('nodemailer');
const User = require('../models/user');
// Transporter
const mailerSettings = require('./node-mailer-settings');
const transporter = mailerSettings.transporter;
//
//CREATE
//

//Display agenda form view 
exports.getAddAgenda = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;

  }
  res.render('template', {
    pageTitle: 'Add Agenda',
    role: req.user.role,
    PagetoLoad: 'agenda-form',
    SocialLinks: socialLinks,
    errorMessage: message,
    editing: false,
    oldInput: {
      meetingDay: '',
      presiding: '',
      leading: '',
      authorities: '',
      pPlayer: '',
      mDirector: '',
      fHymn: '',
      fPrayer: '',
      wAffairs: '',
      sHymn: '',
      fSpeaker: '',
      fTopic: '',
      sSpeaker: '',
      sTopic: '',
      tSpeaker: '',
      tTopic: '',
      lHymn: '',
      lPrayer: ''
    },
    validationErrors: []
  });
};

// Add an Agenda
exports.postAddAgenda = (req, res, next) => {
  const {
    meetingDay,
    presiding,
    leading,
    authorities,
    pPlayer,
    mDirector,
    fHymn,
    fPrayer,
    wAffairs,
    sHymn,
    fSpeaker,
    fTopic,
    sSpeaker,
    sTopic,
    tSpeaker,
    tTopic,
    lHymn,
    lPrayer,
    meetingKind

  } = req.body;

  // Validation 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('template', {
      pageTitle: 'Add Agenda',
      role: req.user.role,
      PagetoLoad: 'agenda-form',
      SocialLinks: socialLinks,
      editing: false,
      errorMessage: errors.array()[0].msg,
      oldInput: {
        meetingDay: meetingDay,
        presiding: presiding,
        leading: leading,
        authorities: authorities,
        pPlayer: pPlayer,
        mDirector: mDirector,
        fHymn: fHymn,
        fPrayer: fPrayer,
        wAffairs: wAffairs,
        sHymn: sHymn,
        fSpeaker: fSpeaker,
        fTopic: fTopic,
        sSpeaker: sSpeaker,
        sTopic: sTopic,
        tSpeaker: tSpeaker,
        tTopic: tTopic,
        lHymn: lHymn,
        lPrayer: lPrayer,
        meetingKind: meetingKind
      },
      validationErrors: errors.array()
    });
  }

  const agenda = new Agenda({
    meetingDay: meetingDay,
    presiding: presiding,
    leading: leading,
    authorities: authorities,
    pPlayer: pPlayer,
    mDirector: mDirector,
    fHymn: fHymn,
    fPrayer: fPrayer,
    wAffairs: wAffairs,
    sHymn: sHymn,
    fSpeaker: fSpeaker,
    fTopic: fTopic,
    sSpeaker: sSpeaker,
    sTopic: sTopic,
    tSpeaker: tSpeaker,
    tTopic: tTopic,
    lHymn: lHymn,
    lPrayer: lPrayer,
    meetingKind: meetingKind
  });
  agenda
    .save()
    .then(result => {
      console.log('New Agenda created');
      res.redirect('/agendas');
    })
    .catch(err => {
      console.log(err);
    });


};

//
// READ
//

//Get all agendas
exports.getAgendas = (req, res, next) => {
  
  Agenda.find()
    .then(agendas => {
     console.log("Loading agendas display");
      res.render('template', {
              pageTitle: 'Agendas',
              PagetoLoad: 'agendas',
              SocialLinks: socialLinks,
              agendas: agendas,
              role: req.user.role
          });
        
    })
    .catch(err => {
     
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

//Get agenda by id
exports.getAgenda = (req, res, next) => {
  //Check for error message
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  
  const agendaId = req.params.agendaId;
  Agenda.findById(agendaId)
    .then(agenda => {
      console.log(agenda);
      res.render('template', {
        pageTitle: 'View Agenda',
        role: req.user.role,
        PagetoLoad: "view-agenda",
        SocialLinks: socialLinks,
        agenda: agenda
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

//
// UPDATE
//

//Load populated edit form
exports.getEditAgenda = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/agendas');
  }
  //Check for error message
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  const agendaId = req.params.agendaId;
  Agenda.findById(agendaId)
    .then(agenda => {
      if (!agenda) {
        return res.redirect('/agendas');
      }
      console.log("Agenda to edit:");
      console.log(agenda);
      res.render('template', {
        pageTitle: 'Edit Agenda',
        role: req.user.role,
        PagetoLoad: 'agenda-form',
        SocialLinks: socialLinks,
        errorMessage: message,
        agenda: agenda,
        editing: true,
        oldInput: {
          meetingDay: '',
          presiding: '',
          leading: '',
          authorities: '',
          pPlayer: '',
          mDirector: '',
          fHymn: '',
          fPrayer: '',
          wAffairs: '',
          sHymn: '',
          fSpeaker: '',
          fTopic: '',
          sSpeaker: '',
          sTopic: '',
          tSpeaker: '',
          tTopic: '',
          lHymn: '',
          lPrayer: ''
        },
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const agendaId = req.body.agendaId;
  res.locals.updateAgenda = req.body.updateAgenda;
  const updatedMeetingDay = req.body.meetingDay;
  const updatedPresiding = req.body.presiding;
  const updatedLeading = req.body.leading;
  const updatedAuthorities = req.body.authorities;
  const updatedpPlayer = req.body.pPlayer;
  const updatedmDirector = req.body.mDirector;
  const updatedfHymn = req.body.fHymn;
  const updatedfPrayer = req.body.fPrayer;
  const updatedwAffairs = req.body.wAffairs;
  const updatedsHymn = req.body.sHymn;
  const updatedfSpeaker = req.body.fSpeaker;
  const updatedfTopic = req.body.fTopic;
  const updatedsSpeaker = req.body.sSpeaker;
  const updatedsTopic = req.body.sTopic;
  const updatedtSpeaker = req.body.tSpeaker;
  const updatedtTopic = req.body.tTopic;
  const updatedlHymn = req.body.lHymn;
  const updatedlPrayer = req.body.lPrayer;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('template', {
      pageTitle: 'Add Agenda',
      role: req.user.role,
      PagetoLoad: 'agenda-form',
      SocialLinks: socialLinks,
      errorMessage: errors.array()[0].msg,
      editing: true,
      agenda: {
        _id: agendaId,
        meetingDay: updatedMeetingDay,
        presiding: updatedPresiding,
        leading: updatedLeading,
        authorities: updatedAuthorities,
        pPlayer: updatedpPlayer,
        mDirector: updatedmDirector,
        fHymn: updatedfHymn,
        fPrayer: updatedfPrayer,
        wAffairs: updatedwAffairs,
        sHymn: updatedsHymn,
        fSpeaker: updatedfSpeaker,
        fTopic: updatedfTopic,
        sSpeaker: updatedsSpeaker,
        sTopic: updatedsTopic,
        tSpeaker: updatedtSpeaker,
        tTopic: updatedtTopic,
        lHymn: updatedlHymn,
        lPrayer: updatedlPrayer
      },
      oldInput: {
        meetingDay: '',
        presiding: '',
        leading: '',
        authorities: '',
        pPlayer: '',
        mDirector: '',
        fHymn: '',
        fPrayer: '',
        wAffairs: '',
        sHymn: '',
        fSpeaker: '',
        fTopic: '',
        sSpeaker: '',
        sTopic: '',
        tSpeaker: '',
        tTopic: '',
        lHymn: '',
        lPrayer: ''
      },
      validationErrors: []
    });
  }

  Agenda.findById(agendaId)
    .then(agenda => {
      agenda.meetingDay = updatedMeetingDay,
        agenda.presiding = updatedPresiding,
        agenda.leading = updatedLeading,
        agenda.authorities = updatedAuthorities,
        agenda.pPlayer = updatedpPlayer,
        agenda.mDirector = updatedmDirector,
        agenda.fHymn = updatedfHymn,
        agenda.fPrayer = updatedfPrayer,
        agenda.wAffairs = updatedwAffairs,
        agenda.sHymn = updatedsHymn,
        agenda.fSpeaker = updatedfSpeaker,
        agenda.fTopic = updatedfTopic,
        agenda.sSpeaker = updatedsSpeaker,
        agenda.sTopic = updatedsTopic,
        agenda.tSpeaker = updatedtSpeaker,
        agenda.tTopic = updatedtTopic,
        agenda.lHymn = updatedlHymn,
        agenda.lPrayer = updatedlPrayer
      return agenda.save()
        .then(result => {
          res.locals.updateAgenda = 1;
          console.log("udpate-metod: " + res.locals.updateAgenda);
          console.log('Agenda updated!');
          //res.redirect('/agendas');
          Agenda.find()
          .then(agendas => {
             res.render('template', {
                    pageTitle: 'Agendas',
                    role: req.user.role,
                    PagetoLoad: 'agendas',
                    SocialLinks: socialLinks,
                    agendas: agendas
                });
                
          })
          .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
          });
        });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

//
// DELETE
 exports.getDeleteAgenda = (req, res, next) => {
  console.log("Ready to delete agenda.")
   // Validation by role ( Only addmind Can Add to the Create agenda view)
 const role = req.user.role;
 console.log( role);
 if(role !== "admin"){
  return res.redirect('/agendas');
 }
  const agendaId = req.params.agendaId;
  Agenda.deleteOne({
      _id: agendaId
    })
    .then(() => {
      console.log('Agenda destroyed!');
      res.redirect('/agendas');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Email to clerk
exports.getEmailtoClerk = (req, res, next) => {
  const senderE = req.query.sender;
  if(senderE){
    res.locals.sending = true;
  }
  if(senderE == undefined){
    res.locals.sending = false;
  }
  let message = req.flash('error');
  if (message.length > 0) {
      message = message[0];
  } else {
      message = null;
  }
  const agendaId = req.params.agendaId;
  Agenda.findById(agendaId)
    .then(agenda => {   
      
      console.log(agenda);

      let htmlBodyContent = "";
      if (agenda.meetingKind == 'isNormal') {
        htmlBodyContent = `
        <h1 style='text-align: center;'>Sacrament Meeting Agenda</h1>
        <hr>
        <ul style='line-height: 2em;'>
          <li><strong>Date: </strong>${agenda.meetingDay}</li>
          <li><strong>Presiding: </strong>${agenda.presiding}</li>
          <li><strong>Leading: </strong>${agenda.leading}</li>
        </ul>
        <hr>
        <ul style='line-height: 2em;'>
          <li><strong>Music: </strong>${agenda.pPlayer}</li>
          <li><strong>Music Director: </strong>${agenda.mDirector}</li>
          <li><strong>First Hymn: </strong>${agenda.fHymn}</li>
          <li><strong>First Prayer: </strong>${agenda.fPrayer}</li>
        </ul>
        <hr>
        <ul style='line-height: 2em;'>
          <li><strong>Authorities Acknowledgment: </strong>${agenda.authorities}</li>
          <li><strong>Ward Affairs: </strong>${agenda.wAffairs}</li>
          <li><strong>Sacrament Hymn: </strong>${agenda.sHymn}</li>
        </ul>
        <hr>
        <ul style='line-height: 2em;'>
          <li><strong>First Speaker: </strong>${agenda.fSpeaker}</li>
          <li><strong>Topic: </strong>${agenda.fTopic}</li>
          <li><strong>Second Speaker: </strong>${agenda.sSpeaker}</li>
          <li><strong>Topic: </strong>${agenda.sTopic}</li>
          <li><strong>Third Speaker: </strong>${agenda.tSpeaker}</li>
          <li><strong>Topic: </strong>${agenda.tTopic}</li>
        </ul>
        <hr> 
      
        <ul style='line-height: 2em;'>
          <li><strong>Last Hymn: </strong>${agenda.lHymn}</li>
          <li><strong>Ward Last Prayer: </strong>${agenda.lPrayer}</li>
        </ul>
        <p style='text-align: center;'><strong>The Sacred Planner Team&reg;</strong></p>
      `;
      } else {
        htmlBodyContent = `
        <h1 style='text-align: center;'>Fast Sacrament Meeting Agenda</h1>
        <hr>
        <ul style='line-height: 2em;'>
          <li><strong>Date: </strong>${agenda.meetingDay}</li>
          <li><strong>Presiding: </strong>${agenda.presiding}</li>
          <li><strong>Leading: </strong>${agenda.leading}</li>
        </ul>
        <hr>
        <ul style='line-height: 2em;'>
          <li><strong>Music: </strong>${agenda.pPlayer}</li>
          <li><strong>Music Director: </strong>${agenda.mDirector}</li>
          <li><strong>First Hymn: </strong>${agenda.fHymn}</li>
          <li><strong>First Prayer: </strong>${agenda.fPrayer}</li>
        </ul>
        <hr>
        <ul style='line-height: 2em;'>
          <li><strong>Authorities Acknowledgment: </strong>${agenda.authorities}</li>
          <li><strong>Ward Affairs: </strong>${agenda.wAffairs}</li>
          <li><strong>Sacrament Hymn: </strong>${agenda.sHymn}</li>
        </ul>
        <hr>
        <p><strong>Now it's time for the Fast Meeting Testimonies, please invite to the members</strong></p>
        <hr> 
      
        <ul style='line-height: 2em;'>
          <li><strong>Last Hymn: </strong>${agenda.lHymn}</li>
          <li><strong>Ward Last Prayer: </strong>${agenda.lPrayer}</li>
        </ul>
        <p style='text-align: center;'><strong>The Sacred Planner Team&reg;</strong></p>
      `;
      }
      
      transporter.sendMail({
        to: res.locals.mail, //Please add your personal email where you'll receive the contact form response
        from: 'contact@sacredplanner.xyz',
        subject: 'Sacrament Meeting Agenda | ' + agenda.meetingDay + ' | The Sacred Planner',
        html: htmlBodyContent
      }).then(function (success) {
          req.flash('error', 'Mensaje Enviado Correctamente!');
          res.redirect('/');
     }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
      
      Agenda.find()
      .then(agendas => {
         res.render('template', {
                pageTitle: 'Agendas',
                role: req.user.role,
                PagetoLoad: 'agendas',
                SocialLinks: socialLinks,
                agendas: agendas
            });
            
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