// add middlewares here related to projects
const Project = require('./projects-model');

function validateProjectId(req, res, next) {
  Project.get(req.params.id) 
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'project with specified id does not exist' });
        return;
      }

      next();
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' });
      return;
    });

}

module.exports = { validateProjectId }
