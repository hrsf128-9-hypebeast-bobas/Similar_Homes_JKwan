const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/trulia'

const db = mongoose.connect(mongoUri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//test for connection
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  // we're connected!
  console.log('connect to mongo')
});
module.exports = db;