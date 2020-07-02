const mongoose = require('mongoose');
const mongoUri = 'mongodb://172.17.0.2/trulia'

mongoose.connect(mongoUri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.Promise = global.Promise
const db = mongoose.connection

//test for connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connect to mongo')
});

module.exports = db;