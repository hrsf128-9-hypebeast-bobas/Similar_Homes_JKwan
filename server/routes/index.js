const router = require('express').Router();

const similarRouter = require('./similarListings');
const nearbyRouter = require('./nearbyListings');

router.use('/similarListings', similarRouter);
router.use('/nearbyListings', nearbyRouter);

module.exports = router;
