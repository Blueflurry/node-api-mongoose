const express = require('express');
const calendarsController = require('./calendars.controller');

const router = express.Router();

router.get('/', calendarsController.getAll);
router.get('/:id', calendarsController.getOne);
router.post('/', calendarsController.create);
router.put('/:id', calendarsController.update);
router.delete('/:id', calendarsController.delete);
router.patch('/:id', calendarsController.update); // Using update for patch
router.post('/search', calendarsController.search);

module.exports = router;