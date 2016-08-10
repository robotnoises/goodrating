'use strict';

let config = require('./config');
let express = require('express');
let app = express();

console.log('Starting.');

app.listen(8080, () => {
  console.log('Server started.');
});

// API parent route
let api = express.Router({mergeParams: true});
app.use(config.API_ROOT, api);

/**
 * API endpoints
 */

let recipe = require('./recipes');

// Run the ratings engine for current year
api.post('/run', (req, res) => {
  res.json({
    'year': config.CURRENT_YEAR
  })
});

// Run the ratings engine for a certain year
api.post('/run/:year', (req, res) => {
  try {
    recipe(req.params.year)
      .then((data) => res.json(data))
      .catch((error) => res.json({ 'error': error }))
  } catch(ex) {
    res.json(ex);
  }
});
