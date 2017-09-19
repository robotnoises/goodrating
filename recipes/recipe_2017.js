'use strict';

let path = require('path');
let config = require('./../config');
let maps = require('./../maps');
let parse = require('./../services/Parse');
let Fetch = require('./../services/Fetch');
let ObjectUtils = require('./../services/ObjectUtils');
let Calc = require('./../services/Calc');
let Rating = require('./../models/Rating');

let fetchMe = new Fetch();

// Get a list of schools

function getListOfSchools() {
  return fetchMe
    .by(maps.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'current', 'json', 'team_records', '2017-03.json'));
}

function getSOS() {
  return fetchMe
    .by(maps.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'current', 'json', 'team_sos', '2017-03.json'));
}

function getOffensiveStats() {
  return fetchMe
    .by(maps.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'current', 'json', 'team_offense', '2017-03.json'));
}

function getDefensiveStats() {
  return fetchMe
    .by(maps.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'current', 'json', 'team_defense', '2017-03.json'));
}

function getPlayerRanksFor(year) {
  return fetchMe
    .by(maps.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'archived', 'json', 'player_rankings', `${year}.json`));
}

module.exports = (params) => {
  const sortBy = params.query.sortby || '';

  return new Promise((resolve, reject) => {
    let teamPerformance = {};
    let sos = {};
    let oStats = {};
    let dStats = {};

    getListOfSchools()
      .then(data => {
        teamPerformance = parse.teamRecords(data);
        return getSOS();
      })
      .then(data => {
        sos = parse.teamSOS(data);
        return getOffensiveStats();
      })
      .then(data => {
        oStats = parse.offensiveStats(data);
        return getDefensiveStats();
      })
      .then(data => {
        dStats = parse.defensiveStats(data);
        return getPlayerRanksFor('2017');
      })
      .then(data => {
        const pRatings = parse.playerRanks(data);
        const combiner = new ObjectUtils();
        return combiner.combine(teamPerformance, sos, oStats, dStats, pRatings);
      })
      .then(combinedData => {
        let arrayer = new ObjectUtils(combinedData);
        let calulator = new Calc(arrayer.toArray(Rating), params.query);
        resolve(calulator.ratings(sortBy));
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
