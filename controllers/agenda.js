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


//Displays all agendas
exports.getAgendas = (req, res, next) => {
  res.render('template', {
      pageTitle: 'Agendas',
      PagetoLoad: 'agendas',
      SocialLinks: socialLinks
  });
};


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
      oldInput: {
          presiding: '',
          leading: '',
          MeetingDay: ''
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

  } = req.body;
// validation section not finished yet 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('template', {
      pageTitle: 'Add Agenda',
      PagetoLoad: 'agenda-form',
      SocialLinks: socialLinks,
      errorMessage: errors.array()[0].msg
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
    lPrayer: lPrayer
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