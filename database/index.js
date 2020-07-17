const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/trulia';
mongoose.Promise = require('bluebird');

mongoose.connect(mongoUri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// test for connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('connect to mongo');
});

module.exports = db;
