const express = require('express');
const app = express();
const port = 3003;
const path = require('path');
const bodyParser = require('body-parser');
const Listings = require('../database/Listings.js');
const axios = require('axios');
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/../client/dist')))

/* Get listings for similar homes */
app.get('/api/nearbyListings/:id', (req, res) => {
  Listings.nearbyListings.find({_id: id})
    .exec()
    .then((listings) => res.status(200).send(listings))
    .catch((err) => res.sendStatus(404));
})

app.post('/api/nearbyListings', (req, res) => {
  const listing = req.body;
  Listings.nearbyListings.create(listing)
    .exec()
    .then((listings) => res.status(200).send(listings))
    .catch((err) => res.sendStatus(401));
})

app.put('/api/nearbyListings/', (req, res) => {
  const listing = req.body;
  Listings.nearbyListings.update(listing)
    .exec()
    .then(() => res.sendStatus(204))
    .catch((err) => res.sendStatus(400));
})

app.delete('/api/nearbyListings/:id', (err, data) => {
  Listings.nearbyListings.findByIdAndRemove({_id: id})
  .exec()
  .then(() => res.sendStatus(204))
  .catch((err) => res.sendStatus(400));
})

/* Get listings for nearby homes */
app.get('/api/nearbyListings/:id', (req, res) => {
  Listings.nearbyListings.find({_id: id})
    .exec()
    .then((listings) => res.status(200).send(listings))
    .catch((err) => res.sendStatus(404));
})

app.post('/api/nearbyListings', (req, res) => {
  const listing = req.body;
  Listings.nearbyListings.create(listing)
    .exec()
    .then((listings) => res.status(200).send(listings))
    .catch((err) => res.sendStatus(401));
})

app.put('/api/nearbyListings/', (req, res) => {
  const listing = req.body;
  Listings.nearbyListings.update(listing)
    .exec()
    .then(() => res.sendStatus(204))
    .catch((err) => res.sendStatus(400));
})

app.delete('/api/nearbyListings/:id', (err, data) => {
  Listings.nearbyListings.findByIdAndRemove({_id: id})
  .exec()
  .then(() => res.sendStatus(204))
  .catch((err) => res.sendStatus(400));
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

module.exports = app;