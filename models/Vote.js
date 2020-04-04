const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  candidat: {
    type: String,
    required: true
  },
  points: {
    type: String,
    required: true
  }
});

// Creation de la collection et ajout du Schema
const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;