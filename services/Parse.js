'use strict';

let Rating = require('./../models/Rating');
let Convert = require('./Convert');
let teamName = require('./TeamName');

function teamRecords(data) {
  
  return data.reduce((prev, curr) =>{
    const name = teamName.normalize(curr.name);
    const key = Convert.sentenceToWord(name.toLowerCase());
    const d = {
      name: name,
      slug: key,
      win_percentage: Convert.percentToFloat(curr.win_percentage),
      margin_of_victory: Convert.stringToFloat(curr.margin_of_victory),
      ats: Convert.stringToFloat(curr.ats)
    };
    
    prev[key] = d;
    return prev;
  }, {});
}

function teamSOS(data) {
  return data.reduce((prev, curr) =>{
    const name = teamName.normalize(curr.name);
    const key = Convert.sentenceToWord(name.toLowerCase());
    const d = {
      name: name,
      slug: key,
      sos: parseFloat(curr.sos_rating)
    };
    
    prev[key] = d;
    return prev;
  }, {});
}

function offensiveStats(data) {
 return data.reduce((prev, curr) => {
   const name = teamName.normalize(curr.name);
   const key = Convert.sentenceToWord(name.toLowerCase());
   const d = {
     name: name,
     slug: key,
     ypp_offense: parseFloat(curr.numyards_total) / parseFloat(curr.numplays_total)
   }

   prev[key] = d;
   return prev;
 }, {});
}

function defensiveStats(data) {
  return data.reduce((prev, curr) => {
    const name = teamName.normalize(curr.name);
    const key = Convert.sentenceToWord(name.toLowerCase());
    const d = {
      name: name,
      slug: key,
      ypp_defense: parseFloat(curr.numyards_total) / parseFloat(curr.numplays_total)
    };
    
    prev[key] = d;
    return prev;
  }, {});
}

function playerRanks(data) {
  return data.reduce((prev, curr) => {
    const name = teamName.normalize(curr.name);
    const key = Convert.sentenceToWord(name.toLowerCase());
    const d = {
      name: name,
      slug: key,
      recruiting_score: parseFloat(curr.score)
    };

    prev[key] = d;
    return prev;
  }, {});
}

module.exports = {
  teamRecords: teamRecords,
  teamSOS: teamSOS,
  offensiveStats: offensiveStats,
  defensiveStats: defensiveStats,
  playerRanks: playerRanks
}