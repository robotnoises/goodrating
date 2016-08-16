'use strict';

let recipe_2015 = require('./recipe_2015');
let recipe_2016 = require('./recipe_2016'); 

module.exports = (params) => {
  switch(params.year) {
    case '2015':
      return recipe_2015(params.query, params.week);
    default:
      return Promise.reject(`No data for the year ${year}`);
  }
}