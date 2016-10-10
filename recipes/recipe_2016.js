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
    .at(path.join(config.PROJECT_ROOT, 'data', 'current', 'json', 'team_records', '2016-06.json'));
}

function getSOS() {
  return fetchMe
    .by(maps.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'current', 'json', 'team_sos', '2016-06.json'));
}

function getOffensiveStats() {
  return fetchMe
    .by(maps.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'current', 'json', 'team_offense', '2016-06.json'));
}

function getDefensiveStats() {
  return fetchMe
    .by(maps.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'current', 'json', 'team_defense', '2016-06.json'));
}

function getPlayerRanksFor(year) {
  return fetchMe
    .by(maps.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'archived', 'json', 'player_rankings', `${year}.json`));
}

module.exports = (params) => {

  let sortBy = params.query.sortby || '';

  return new Promise((resolve, reject) => {
      
    let teamPerformance = {};
    let sos = {};
    let oStats = {};
    let dStats = {};
    let pRatings = {};

    getListOfSchools()
      .then((data) => {
        teamPerformance = parse.teamRecords(data.result.extractorData.data[0].group);
        return getSOS();
      })
      .then((data) => {
        sos = parse.teamSOS(data.result.extractorData.data[0].group);
        return getOffensiveStats();
      })
      .then((data) => {
        oStats = parse.offensiveStats(data.result.extractorData.data);
        return getDefensiveStats();
      })
      .then((data) => {
        dStats = parse.defensiveStats(data.result.extractorData.data[0].group);
        return getPlayerRanksFor('2013');
      })
      .then((data) => {
        pRatings = parse.playerRanks(data.extractorData.data);
        return getPlayerRanksFor('2014');
      })
      .then((data) => {
        let oAdder = new ObjectUtils(parse.playerRanks(data.extractorData.data));
        pRatings = oAdder.add(pRatings, 'recruiting_score');
        return getPlayerRanksFor('2015');
      })
      .then((data) => {
        let oAdder = new ObjectUtils(parse.playerRanks(data.extractorData.data));
        pRatings = oAdder.add(pRatings, 'recruiting_score');
        return getPlayerRanksFor('2016');
      })
      .then((data) => {
        let adder = new ObjectUtils(parse.playerRanks(data.extractorData.data));
        let combiner = new ObjectUtils();

        pRatings = adder.add(pRatings, 'recruiting_score');
        return combiner.combine(teamPerformance, sos, oStats, dStats, pRatings);
      })
      .then((combinedData) => {
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
