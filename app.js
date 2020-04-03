/****  
 *   REQUIRE MODULES FOR THIS APP
 *   
* */

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Configuration du dossier ** public **
app.use(express.static(path.join(__dirname, 'public')));

// Middleware Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Activation du CORD
app.use(cors());


/** Congifuration SERVEUR PORT */
const port = 127;

app.listen(port, () => {
    console.log("Serveur demarré sur le port " + port);
});

