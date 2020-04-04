/****
 * REQUIRE MODULES
 */
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote'); // Require vote schema

const Pusher = require("pusher"); // Require Pusher module


/***  Import the Pusher   ***/
var pusher = new Pusher({
  appId: '975577',
  key: '0e5dedc09bfbf94b0788',
  secret: '512133f814b00dfbdf3e',
  cluster: 'eu'
});

router.get("/", (req, res) => {
  Vote.find().then(votes => res.json({success: true, votes: votes}));
});

router.post("/", (req, res) => {
  const newVote = {
    candidat : req.body.candidat,
    points : 1
  }

  // Instance model constructor
  new Vote(newVote).save().then(vote => {
    pusher.trigger('candidat-poll', 'candidat-vote', {
      points : parseInt(vote.points),
      candidat: vote.candidat
    });
  
    return res.json({success: true, message: "Merci pour votre votre"}); // Message d'envoi une fois le vote effectué
  });
 
});


module.exports = router;