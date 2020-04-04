const express = require("express");

const router = express.Router();

const Pusher = require("pusher"); // Require Pusher module


/***  Import the Pusher   ***/
var pusher = new Pusher({
  appId: '975577',
  key: '0e5dedc09bfbf94b0788',
  secret: '512133f814b00dfbdf3e',
  cluster: 'eu'
});

router.get("/", (req, res) => {
  res.send("POLL");
});

router.post("/", (req, res) => {
  pusher.trigger('candidat-poll', 'candidat-vote', {
    points : 1,
    candidat: req.body.candidat
  });

  return res.json({success: true, message: "Merci pour votre votre"}); // Message d'envoi une fois le vote effectué
});


module.exports = router;