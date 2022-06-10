// add middlewares here related to projects
const express = require('express');
const Project = require('./projects-model');

function validateProjectId(req, res, next) {
  Project.get(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'project not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' });
    })

  next();
}

function validateProject(req, res, next) {

  if (Object.keys(req.body).length !== 2
      || Object.keys(req.body).indexOf('name') === -1
      || Object.keys(req.body).indexOf('description') === -1) {
    res.status(400).json({ 
      message: "required fields are 'name' and 'description'"
    });
  }

  next();
}

function validateExistingProject(req, res, next) {

  if (Object.keys(req.body).length !== 3
      || Object.keys(req.body).indexOf('name') === -1 
      || Object.keys(req.body).indexOf('description') === -1
      || Object.keys(req.body).indexOf('completed') === -1) {
        res.status(400).json({
          message: "required fields are 'name', 'description', and 'completed'"
        });
     }

  next();
}

module.exports = { validateProjectId, validateProject, validateExistingProject }
