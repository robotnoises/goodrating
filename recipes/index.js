'use strict';

let recipe_2015 = require('./recipe_2015');
let recipe_2016 = require('./recipe_2016');
let recipe_2017 = require('./recipe_2017');

module.exports = (params) => {
  switch(params.year) {
    case '2015':
      return recipe_2015(params);
    case '2016':
      return recipe_2016(params);
    case '2017':
      return recipe_2017(params);
    default:
      return Promise.reject(`No data for the year ${year}`);
  }
};
