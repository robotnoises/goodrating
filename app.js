'use strict';

let config = require('./config');
let express = require('express');
let cors = require('cors');
let RequestParams = require('./models/RequestParams');
let recipe = require('./recipes');
let api = express.Router({ mergeParams: true });
let app = express();

console.log('Starting.');

app.listen(process.env.PORT || 12345, () => {
  console.log('Server started.');
});

// Enable cross-origin requests
app.use(cors());

/**
 * API endpoints
 */

// API parent route
app.use(config.API_ROOT, api);

function calc(params) {
  try {
    return recipe(params);
  } catch(ex) {
    return Promise.reject(ex);
  }
}

// Run the ratings engine for current year
api.get('/calc', (req, res) => {
  calc(new RequestParams(req.query))
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
api.get('/calc/:year', (req, res) => {
  calc(new RequestParams(req.query, req.params.year))
    .then((data) => {
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(404);
      res.json({ 'error': error })
    });
});

// api.get('/calc/:year/:week', (req, res) => {
//   calc(new RequestParams(req.query, req.params.year, req.params.week))
//     .then((data) => {
//       res.status(200);
//       res.json(data);
//     })
//     .catch((error) => {
//       res.status(404);
//       res.json({ 'error': error })
//     });
// });
