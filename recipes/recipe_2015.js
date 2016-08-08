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

module.exports = () => {
  return getListOfSchools()
    .then((data) => {
      let teams = parse.teamRecords(data.extractorData.data[0].group);
      console.log(teams);
    })
    .catch((error) => {
      console.error(error);
    })
};
