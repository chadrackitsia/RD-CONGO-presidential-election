const mongoose = require('mongoose');

// Map global promise
mongoose.Promise = global.Promise;

// Connection à MongoDB
mongoose.connect('mongodb://localhost/vote_sondage',{ 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connection DB reussie'))
.catch((err) => console.log(err))