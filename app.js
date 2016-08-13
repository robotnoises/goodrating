'use strict';

let config = require('./config');
let express = require('express');
let cors = require('cors');
let app = express();

console.log('Starting.');

app.listen(process.env.PORT || 12345, () => {
  console.log('Server started.');
});

// Enable cross-origin requests
app.use(cors());

// API parent route
let api = express.Router({ mergeParams: true });

app.use(config.API_ROOT, api);

/**
 * API endpoints
 */

let recipe = require('./recipes');

function calc(year, qs) {
  try {
    return recipe(year, qs);
  } catch(ex) {
    return Promise.reject(ex);
  }
}

// Run the ratings engine for current year
api.post('/calc', (req, res) => {
  calc(config.CURRENT_YEAR, req.query)
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(404);
      res.json({ 'error': error })
    });
});

// Run the ratings engine for a certain year
api.post('/calc/:year', (req, res) => {
  calc(req.params.year, req.query)
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(404);
      res.json({ 'error': error })
    });
});
