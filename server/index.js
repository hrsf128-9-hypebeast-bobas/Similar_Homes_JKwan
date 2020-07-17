const app = require('./app');
const db = require('../database');

const port = 3003;

db.on('open', () => {
  app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
});
