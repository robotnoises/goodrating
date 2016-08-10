'use strict';

let recipe_2015 = require('./recipe_2015');
let recipe_2016 = require('./recipe_2016'); 

module.exports = (year) => {
  switch(year) {
    case '2015':
      return recipe_2015();
    case '2016':
      return recipe_2016();
    default:
      return Promise.reject(`No recipe for the year ${year}`);
  }
}