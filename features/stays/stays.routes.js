const express = require('express');
const staysController = require('./stays.controller');

const router = express.Router();

router.get('/', staysController.getAll);
router.get('/:id', staysController.getOne);
router.post('/', staysController.create);
router.put('/:id', staysController.update);
router.delete('/:id', staysController.delete);
router.patch('/:id', staysController.update); // Using update for patch
router.post('/search', staysController.search);

module.exports = router;