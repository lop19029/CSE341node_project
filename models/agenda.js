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
    required: true,
    default:null
  },
  sHymn: {
    type: String,
    required: true
  },
    // This item will be send as "null" for the fast agenda option 
  fSpeaker: {
    type: String,
    default:null
  },
  // This item will be send as "null" for the fast agenda option 
  fTopic: {
    type: String,
    default:null
  },
  // This item will be send as "null" for the fast agenda option 
  sSpeaker: {
    type: String,
    default:null
  },
  // This item will be send as "null" for the fast agenda option 
  sTopic: {
    type: String,
    default:null
  },
    // This item will be send as "null" for the fast agenda option 
  tSpeaker: {
    type: String,
    default:null
  },
    // This item will be send as "null" for the fast agenda option 
  tTopic: {
    type: String,
    default:null
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