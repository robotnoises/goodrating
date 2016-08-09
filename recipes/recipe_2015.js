'use strict';

let path = require('path');
let config = require('./../config');
let enums = require('./../enums');
let parse = require('./../services/Parse');
let Fetch = require('./../services/Fetch');

let fetchMe = new Fetch();

// Get a list of schools

function getListOfSchools() {
  return fetchMe
    .by(enums.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'archived', 'json', 'team_records', '2015.json'));
}

function getOffensiveRanks() {
  return fetchMe
    .by(enums.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'archived', 'json', 'team_offense', '2015.json'));
}

module.exports = () => {
  
  let teams = {};
  let oRanks = {};
  let dRanks = {};
  let pRanks = {};

  return getListOfSchools()
    .then((data) => {
      teams = parse.teamRecords(data.extractorData.data[0].group);
      return getOffensiveRanks();
    })
    .then((data) => {
      oRanks = parse.offensiveRanks(data.extractorData.data);
      var foo;
    })
    .catch((error) => {
      console.error(error);
    })
};
