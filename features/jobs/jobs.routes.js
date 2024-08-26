const express = require('express');
const jobsController = require('./jobs.controller');

const router = express.Router();

router.get('/', jobsController.getAll);
router.get('/:id', jobsController.getOne);
router.post('/', jobsController.create);
router.put('/:id', jobsController.update);
router.delete('/:id', jobsController.delete);
router.patch('/:id', jobsController.update); // Using update for patch
router.post('/search', jobsController.search);

module.exports = router;