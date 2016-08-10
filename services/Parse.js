'use strict';

let Rating = require('./../models/Rating');
let Convert = require('./Convert');
let teamName = require('./TeamName');

function teamRecords(data) {
  return data.reduce((prev, curr) =>{
    let name = teamName.normalize(curr.name[0].text);
    let key = Convert.sentenceToWord(name.toLowerCase());
    let d = {
      name: name,
      win_percentage: Convert.percentToFloat(curr.win_percentage[0].text),
      ats: Convert.stringToFloat(curr.ats[0].text)
    };
    
    prev[key] = d;
    
    return prev;
  }, {});
}

function offensiveStats(data) {
  
  // Let's tame this data structure a bit...
  let arrayOfArrays = [];

  data.forEach((item) => {
    arrayOfArrays.push(item.group);
  });

  let flattened = [].concat.apply([], arrayOfArrays);

  return flattened
    .reduce((prev, curr) => {
      let name = teamName.normalize(curr.name[0].text);
      let key = Convert.sentenceToWord(name.toLowerCase());
      let d = {
        name: name,
        ypp_offense: parseFloat(curr.numyards_total[0].text) / parseFloat(curr.numplays_total[0].text)
      }

      prev[key] = d;

      return prev;
    }, {});
}

function defensiveStats(data) {
  return data.reduce((prev, curr) => {
    let name = teamName.normalize(curr.name[0].text);
    let key = Convert.sentenceToWord(name.toLowerCase());
    let d = {
      name: name,
      ypp_defense: parseFloat(curr.numyards_total[0].text) / parseFloat(curr.numplays_total[0].text)
    };
    
    prev[key] = d;
    
    return prev;
  }, {});
}

function playerRanks(data) {
  
  // Let's tame this data structure a bit...
  let arrayOfArrays = [];

  data.forEach((item) => {
    arrayOfArrays.push(item.group);
  });

  let flattened = [].concat.apply([], arrayOfArrays);

  return flattened.reduce((prev, curr) => {
    let name = teamName.normalize(curr.name[0].text);
    let key = Convert.sentenceToWord(name.toLowerCase());
    let d = {
      name: name,
      recruiting_score: parseFloat(curr.score[0].text)
    };

    prev[key] = d;

    return prev;
  }, {});
}

module.exports = {
  teamRecords: teamRecords,
  offensiveStats: offensiveStats,
  defensiveStats: defensiveStats,
  playerRanks: playerRanks
}