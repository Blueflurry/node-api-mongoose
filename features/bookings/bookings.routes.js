const express = require('express');
const bookingsController = require('./bookings.controller');

const router = express.Router();

router.get('/', bookingsController.getAll);
router.get('/:id', bookingsController.getOne);
router.post('/', bookingsController.create);
router.put('/:id', bookingsController.update);
router.delete('/:id', bookingsController.delete);
router.patch('/:id', bookingsController.update); // Using update for patch
router.post('/search', bookingsController.search);

module.exports = router;