const router = require('express').Router();

const controllers = require('../controllers');

/* Get listings for similar homes */
router.get('/', controllers.similarListings.getAll);

router.get('/:id', controllers.similarListings.getById);

router.post('/', controllers.similarListings.create);

router.put('/', controllers.similarListings.updateOne);

router.delete('/:id', controllers.similarListings.deleteOne);

module.exports = router;