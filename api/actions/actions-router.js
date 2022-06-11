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

router.get('/:id', middleware.validateActionId, (req, res) => {

  Action.get(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })

});

router.post('/', (req, res) => {
  if (Object.keys(req.body).indexOf('description') === -1
    || Object.keys(req.body).indexOf('notes') === -1) {
    res.status(400).json({ message: 'missing required fields' });
    return;
  }
  Action.insert(req.body)
    .then(result => {
      res.status(201).json(result);
    })
});

router.put('/:id', (req, res) => {
  Action.get(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'action with given id not found' });
        return;
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' });
      return;
    })
  if (Object.keys(req.body).indexOf('notes') === -1
      || Object.keys(req.body).indexOf('description') === -1) {
      res.status(400).json({ message: 'missing required fields' });
      return;
    }
  Action.update(req.params.id, req.body)
    .then(result => { 
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' });
    });
});


router.delete('/:id', async (req, res) => {

  await Action.get(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'not found' });
        return;
      }

      Action.remove(req.params.id)
        .then(result => {
          res.status(200).json(result);
          return;
        })
        .catch(err => {
          res.status(500).json({ message: 'internal server error' });
          return;
        })

    });

});

module.exports = router;
