'use strict';

let path = require('path');
let config = require('./../config');
let enums = require('./../enums');
let mapDaddy = require('./../services/MapDaddy');
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
      let teams = mapDaddy.teamRecords(data.extractorData.data[0].group);
      console.log(teams);
    })
    .catch((error) => {
      console.error(error);
    })
};
