const express = require('express');
const financeController = require('./finance.controller');

const router = express.Router();

router.get('/', financeController.getAll);
router.get('/:id', financeController.getOne);
router.post('/', financeController.create);
router.put('/:id', financeController.update);
router.delete('/:id', financeController.delete);
router.patch('/:id', financeController.update); // Using update for patch
router.post('/search', financeController.search);

module.exports = router;