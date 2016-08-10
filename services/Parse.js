'use strict';

let Rating = require('./../models/Rating');
let Convert = require('./Convert');

function teamRecords(data) {
  return data.reduce((prev, curr) =>{
    let key = Convert.sentenceToWord(curr.name[0].text.toLowerCase());
    let d = {
      name: curr.name[0].text,
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
      let key = Convert.sentenceToWord(curr.name[0].text.toLowerCase());
      let d = {
        name: curr.name[0].text,
        ypp_offense: parseFloat(curr.numyards_total[0].text) / parseFloat(curr.numplays_total[0].text)
      }

      prev[key] = d;

      return prev;
    }, {});
}

function defensiveStats(data) {
  return data.reduce((prev, curr) =>{
    let key = Convert.sentenceToWord(curr.name[0].text.toLowerCase());
    let d = {
      name: curr.name[0].text,
      ypp_defense: parseFloat(curr.numyards_total[0].text) / parseFloat(curr.numplays_total[0].text)
    };
    
    prev[key] = d;
    
    return prev;
  }, {});
}

function playerRanks(data) {
  return data.reduce((prev, curr) => {
    let key = Convert.sentenceToWord(curr.name[0].text.toLowerCase());
    let d = {
      name: curr.name[0].text,
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