'use strict';

let recipe_2015 = require('./recipe_2015');
let recipe_2016 = require('./recipe_2016'); 

module.exports = (year, params) => {
  switch(year) {
    case '2015':
      return recipe_2015(params);
    case '2016':
      return recipe_2016(params);
    default:
      return Promise.reject(`No data for the year ${year}`);
  }
}