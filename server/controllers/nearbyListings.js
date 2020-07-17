const Listings = require('../../database/Listings.js');

module.exports.getAll = (req, res) => {
  Listings.nearbyListings.find()
    .exec()
    .then((listings) => res.status(200).send(listings))
    .catch((err) => res.sendStatus(404));
};

module.exports.getById = (req, res) => {
  Listings.nearbyListings.find({_id: id})
    .exec()
    .then((listings) => res.status(200).send(listings))
    .catch((err) => res.sendStatus(404));
};

module.exports.create = (req, res) => {
  const listing = req.body;
  Listings.nearbyListings.create(listing)
    .exec()
    .then((listings) => res.status(200).send(listings))
    .catch((err) => res.sendStatus(401));
};

module.exports.updateOne = (req, res) => {
  const listing = req.body;
  Listings.nearbyListings.update(listing)
    .exec()
    .then(() => res.sendStatus(204))
    .catch((err) => res.sendStatus(400));
};

module.exports.deleteOne = (req, res) => {
  Listings.nearbyListings.findByIdAndRemove({_id: id})
  .exec()
  .then(() => res.sendStatus(204))
  .catch((err) => res.sendStatus(400));
};