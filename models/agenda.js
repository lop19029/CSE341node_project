const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const normalAngendaSchema = new Schema({
  meetingDay: {
    type: String,
    required: true
  },
  presiding: {
    type: String,
    required: true
  },
  leading: {
    type: String,
    required: true
  },
  authorities: {
    type: String,
    required: true
  },
  pPlayer: {
    type: String,
    required: true
  },
  mDirector: {
    type: String,
    required: true
  },
  fHymn: {
    type: String,
    required: true
  },
  fPrayer: {
    type: String,
    required: true
  },
  wAffairs: {
    type: String,
    required: true
  },
  sHymn: {
    type: String,
    required: true
  },
  fSpeaker: {
    type: String,
    required: true
  },
  fTopic: {
    type: String,
    required: true
  },
  sSpeaker: {
    type: String,
    required: true
  },
  sTopic: {
    type: String,
    required: true
  },
  tSpeaker: {
    type: String,
    required: true
  },
  tTopic: {
    type: String,
    required: true
  },
  lHymn: {
    type: String,
    required: true
  },
  lPrayer: {
    type: String,
    required: true
  }   
});

module.exports = mongoose.model('Agenda', normalAngendaSchema);