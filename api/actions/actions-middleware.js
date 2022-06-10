// add middlewares here related to actions

const express = require('express');
const Action = require('./actions-model');

function validateActionId(req, res, next) {
  Action.get(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'action not found' });
      }
    })

  next();
}

function validateAction(req, res, next) {
  if (Object.keys(req.body).length !== 2
      || Object.keys(req.body).indexOf('description') === -1
      || Object.keys(req.body).indexOf('notes') === -1) {
    res.status(400).json({ message: "missing required 'description' and 'notes' fields" });
  }

  next();
}

function validateExistingAction(req, res, next) {

  if (Object.keys(req.body).length !== 4
  || Object.keys(req.body).indexOf('notes') === -1
  || Object.keys(req.body).indexOf('description') === -1
  || Object.keys(req.body).indexOf('project_id') === -1
  || Object.keys(req.body).indexOf('completed') === -1) {
    res.status(400).json({
      message: "missing required fields: 'notes', 'description', 'project_id', 'completed'"
    });
  }

  next();
}

module.exports = { validateActionId, validateAction, validateExistingAction }
