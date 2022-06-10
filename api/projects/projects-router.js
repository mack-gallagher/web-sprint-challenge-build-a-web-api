// Write your "projects" router here!

const express = require('express');

const Project = require('./projects-model');
const Action = require('../actions/actions-model');
const middleware = require('./projects-middleware');

const router = express.Router();

router.get('/', (req, res) => {
  Project.get()
    .then(result => {
      res.status(200).json(result);
    });
});

router.get('/:id', middleware.validateProjectId, (req, res) => {
  Project.get(req.params.id)
    .then(result => {
      res.status(200).json(result);
    });
});

router.post('/', (req, res) => {
  Project.insert(req.body)
    .then(result => {
      res.status(201).json(result);
    });
});

router.put('/:id', (req, res) => {
  Project.update(req.params.id, req.body)
    .then(result => {
      res.json(result);
    });
});

router.delete('/:id', (req, res) => {
  Project.remove(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
});

router.get('/:id/actions', (req, res) => {
  Project.getProjectActions(req.params.id)
    .then(result => {
      res.status(200).json(result);
    });
});

module.exports = router;
