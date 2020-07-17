const router = require('express').Router();

const controllers = require('../controllers');

/* Get listings for nearby homes */
router.get('/', controllers.nearbyListings.getAll);

router.get('/:id', controllers.nearbyListings.getById);

router.post('/', controllers.nearbyListings.create);

router.put('/', controllers.nearbyListings.updateOne);

router.delete('/:id', controllers.nearbyListings.deleteOne);

module.exports = router;