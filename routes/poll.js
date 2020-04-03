const express = require("express");

const router = express.Router();

const Pusher = require("pusher"); // Require Pusher module


/***  Import the Pusher   ***/
var pusher = new Pusher({
  appId: '975577',
  key: '0e5dedc09bfbf94b0788',
  secret: '512133f814b00dfbdf3e',
  cluster: 'eu',
  encrypted: true
});


router.get("/", (req, res) => {
  res.send("POLL");
});

router.post("/", (req, res) => {
  pusher.trigger('os-poll', 'os-vote', {
    points : 1,
    os: req.body.os
  });

  return res.json({sucess: true, message: "Merci pour votre votre"});
});


module.exports = router;