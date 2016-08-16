'use strict';

let config = require('./../config');

class RequestParams {
  constructor(query, year, week) {
    this.query = query || {};
    this.year = year || config.CURRENT_YEAR;
    this.week = week || null;
  }
}

module.exports = RequestParams;