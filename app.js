'use strict';

let config = require('./config');
let express = require('express');
let app = express();

console.log('Starting.');

app.listen(process.env.PORT || 12345, () => {
  console.log('Server started.');
});

// API parent route
let api = express.Router({ mergeParams: true });
app.use(config.API_ROOT, api);

/**
 * API endpoints
 */

let recipe = require('./recipes');

// Run the ratings engine for current year
api.post('/calc', (req, res) => {
  res.json({
    'year': config.CURRENT_YEAR
  })
});

// Run the ratings engine for a certain year
api.post('/calc/:year', (req, res) => {
  try {
    recipe(req.params.year, req.query)
      .then((data) => {
        res.status(200);
        res.json(data);
      })
      .catch((error) => {
        res.status(404);
        res.json({ 'error': error })
      });
  } catch(ex) {
    res.json(ex);
  }
});
