const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

const router = require('./routes');
app.use('/api', router);

module.exports = app;