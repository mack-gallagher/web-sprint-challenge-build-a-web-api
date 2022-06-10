// Write your "actions" router here!

const express = require('express');

const Project = require('../projects/projects-model');
const Action = require('./actions-model');
const middleware = require('./actions-middleware');

const router = express.Router();

router.get('/', (req, res) => {
  Action.get()
    .then(result => {
      res.status(200).json(result);
    });
});

router.get('/:id', (req, res) => {
  Action.get(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'action with given id not found' });
        return;
      }
      res.status(200).json(result);
    });
});

module.exports = router;
