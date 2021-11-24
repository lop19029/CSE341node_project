/********************Andres********************* */
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

// Imports   
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Agenda = require('../models/agenda');

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
      PagetoLoad: 'agenda-form',
      SocialLinks: socialLinks,
      errorMessage: message,
      editing: false,
      oldInput: {
        meetingDay:'',
        presiding:'',
        leading:'',
        authorities:'',
        pPlayer:'', 
        mDirector: '',
        fHymn:'',
        fPrayer:'',
        wAffairs:'', 
        sHymn:'',
        fSpeaker:'',
        fTopic:'',
        sSpeaker:'',
        sTopic:'',
        tSpeaker:'',
        tTopic:'',
        lHymn:'',
        lPrayer:''
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
      PagetoLoad: 'agenda-form',
      SocialLinks: socialLinks,
      editing: false,
       errorMessage: errors.array()[0].msg,
       oldInput:{
        meetingDay: meetingDay,
        presiding:  presiding,
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
        meetingKind : meetingKind
       },
       validationErrors: errors.array()
     });
   }
   
  const agenda = new Agenda({
    meetingDay: meetingDay,
    presiding:  presiding,
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
    meetingKind : meetingKind
  });
  agenda
  .save()
  .then(result =>{
    console.log('New Agenda created');
    res.redirect('/agendas');
  })
  .catch(err =>{
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
              agendas: agendas
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
        PagetoLoad: "#", //TODO: Include a page to display agendas
        SocialLinks: socialLinks,
        agenda: agenda,
        errorMessage: message,
        oldInput: {
            presiding: '',
            leading: '',
            meetingDay: ''
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
        PagetoLoad: 'agenda-form',
        SocialLinks: socialLinks,
        errorMessage: message,
        agenda: agenda,
        editing: true,
        oldInput: {
            presiding: '',
            leading: '',
            meetingDay: ''
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
  const updatedMeetingDay = req.body.meetingDay;
  const updatedPresiding = req.body.presiding;
  const updatedLeading = req.body.leading;
  const updatedAuthorities= req.body.authorities;
  const updatedpPlayer = req.body.pPlayer;
  const updatedmDirector = req.body.mDirector;
  const updatedfHymn = req.body.fHymn;
  const updatedfPrayer= req.body.fPrayer;
  const updatedwAffairs = req.body.wAffairs;
  const updatedsHymn = req.body.sHymn;
  const updatedfSpeaker = req.body.fSpeaker;
  const updatedfTopic = req.body.fTopic;
  const updatedsSpeaker = req.body.sSpeaker;
  const updatedsTopic = req.body.sTopic;
  const updatedtSpeaker= req.body.tSpeaker;
  const updatedtTopic = req.body.tTopic;
  const updatedlHymn = req.body.lHymn;
  const updatedlPrayer = req.body.lPrayer;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('template', {
      pageTitle: 'Add Agenda',
      PagetoLoad: 'agenda-form',
      SocialLinks: socialLinks,
      errorMessage: errors.array()[0].msg,
      agenda: {
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
      validationErrors: []
    });
  }
    
    Agenda.findById(agendaId)
    .then(agenda => {
      //
      // TODO: If needed, Check if the user trying to edit is the one who created the agenda  or has the role to that
      //
      // if(agenda.userId.toString() !== req.user._id.toString()) {
      //   return res.redirect('/');
      // }
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
        console.log('Agenda updated!');
        res.redirect('/agendas');
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
//

exports.postDeleteAgenda = (req, res, next) => {
  const agendaId = req.body.productId;
  Agenda.deleteOne({_id: agendaId})
    .then(() => {
      console.log('Agenda destroyed!');
      res.redirect('#'); // TODO: Redirect Somewhere
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};