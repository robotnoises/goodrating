'use strict';

let path = require('path');
let config = require('./../config');
let enums = require('./../enums');
let parse = require('./../services/Parse');
let Fetch = require('./../services/Fetch');
let ObjectUtils = require('./../services/ObjectUtils');
let Calc = require('./../services/Calc');
let Rating = require('./../models/Rating');

let fetchMe = new Fetch();

// Get a list of schools

function getListOfSchools() {
  return fetchMe
    .by(enums.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'archived', 'json', 'team_records', '2015.json'));
}

function getOffensiveStats() {
  return fetchMe
    .by(enums.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'archived', 'json', 'team_offense', '2015.json'));
}

function getDefensiveStats() {
  return fetchMe
    .by(enums.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'archived', 'json', 'team_defense', '2015.json'));
}

function getPlayerRanksFor(year) {
  return fetchMe
    .by(enums.SOURCE.FILEPATH)
    .at(path.join(config.PROJECT_ROOT, 'data', 'archived', 'json', 'player_rankings', `${year}.json`));
}

module.exports = () => {

  return new Promise((resolve, reject) => {
      
    let teams = {};
    let oStats = {};
    let dStats = {};
    let pRatings = {};

    getListOfSchools()
      .then((data) => {
        teams = parse.teamRecords(data.extractorData.data[0].group);
        return getOffensiveStats();
      })
      .then((data) => {
        oStats = parse.offensiveStats(data.extractorData.data);
        return getDefensiveStats();
      })
      .then((data) => {
        dStats = parse.defensiveStats(data.extractorData.data[0].group);
        return getPlayerRanksFor('2013');
      })
      .then((data) => {
        pRatings = parse.playerRanks(data.extractorData.data[0].group);
        return getPlayerRanksFor('2014');
      })
      .then((data) => {
        let oAdder = new ObjectUtils(parse.playerRanks(data.extractorData.data[0].group));
        pRatings = oAdder.add(pRatings, 'recruiting_score');
        return getPlayerRanksFor('2015');
      })
      .then((data) => {
        let oAdder = new ObjectUtils(parse.playerRanks(data.extractorData.data[0].group));
        pRatings = oAdder.add(pRatings, 'recruiting_score');
        return getPlayerRanksFor('2016');
      })
      .then((data) => {
        let adder = new ObjectUtils(parse.playerRanks(data.extractorData.data[0].group));
        let combiner = new ObjectUtils();

        pRatings = adder.add(pRatings, 'recruiting_score');
        return combiner.combine(teams, oStats, dStats, pRatings);
      })
      .then((combinedData) => {
        let arrayer = new ObjectUtils(combinedData);
        let calulator = new Calc(arrayer.toArray(Rating));

        let calculated = calulator.ratings();
        
        resolve(calculated);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      })
  });
};
