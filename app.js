'use strict';

let config = require('./config');
let express = require('express');
let app = express();

console.log('Starting.');

app.listen(8080, () => {
  console.log('Server started.');
});

/**
 * API endpoints
 */

app.get('/foo', (req, res) => {
  res.send('yeah!');
});
