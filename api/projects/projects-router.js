// Write your "projects" router here!

const express = require('express');

const Project = require('./projects-model');
const Action = require('../actions/actions-model');
const middleware = require('./projects-middleware');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
  Project.get()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' });
    })
});

router.get('/:id', (req, res) => {
  Project.get(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'project with given id not found' });
        return;
      }
      res.status(200).json(result);
      return;
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    })
});

module.exports = router;
