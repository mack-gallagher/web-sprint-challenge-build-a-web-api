// add middlewares here related to actions

const Action = require('./actions-model');

function validateActionId(req, res, next) {
  Action.get(req.params.id) 
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'action with specified id does not exist' });
        return;
      }

      next();
    })
    .catch(err => {
      res.status(500).json({ message: 'internal server error' });
      return;
    });

}

module.exports = { validateActionId }
