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

router.get('/:id', middleware.validateProjectId, (req, res) => {

  Project.get(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' });
    })

});

router.post('/', (req, res) => {
  if (Object.keys(req.body).indexOf('name') === -1
      || Object.keys(req.body).indexOf('description') === -1) {
    res.status(400).json({ message: "missing required fields: name and description are required" });
    return;
  }
  Project.insert(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' });
    })
});

router.put('/:id', (req, res) => {
  Project.get(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'project with given id not found' });
        return;
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' });
      return;
    })
  if (Object.keys(req.body).indexOf('name') === -1
      || Object.keys(req.body).indexOf('description') === -1
      || Object.keys(req.body).indexOf('completed') === -1) {
      res.status(400).json({ message: 'missing required fields' });
      return;
    }
  Project.update(req.params.id, req.body)
    .then(result => { 
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' });
    });
});

router.delete('/:id', async (req, res) => {

  await Project.get(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'not found' });
        return;
      }

      Project.remove(req.params.id)
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

router.get('/:id/actions', (req, res) => {
  Project.get(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'not found' })
        return;
      }
    });
  Project.getProjectActions(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
})

module.exports = router;
