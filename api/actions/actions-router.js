// Write your "actions" router here!

const express = require('express');

const Project = require('../projects/projects-model');
const Action = require('./actions-model');

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
      res.status(200).json(result);
    });
});

router.post('/', (req, res) => {
  Action.insert(req.body)
    .then(result => {
      res.status(201).json(result);
    })
});

router.put('/:id', (req, res) => {
  Action.update(req.params.id, req.body)
    .then(result => {
      res.json(result);
    });
});

router.delete('/:id', (req, res) => {
  Action.remove(req.params.id)
    .then(result => {
      res.status(200).json(result);
    });
});

module.exports = router;
