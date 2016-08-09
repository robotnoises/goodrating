'use strict';

let Rating = require('./../models/Rating');
let Convert = require('./Convert');

function teamRecords(data) {
  return data.reduce((prev, curr) =>{
    let d = {
      name: Convert.sentenceToWord(curr.name[0].text.toLowerCase()),
      win_percentage: Convert.percentToFloat(curr.win_percentage[0].text),
      ats: Convert.stringToFloat(curr.ats[0].text)
    };
    
    prev[d.name] = d;
    
    return prev;
  }, {});
}

function offensiveRanks(data) {
  
  // Let's tame this data structure a bit...
  let arrayOfArrays = [];

  data.forEach((item) => {
    arrayOfArrays.push(item.group);
  });

  let flattened = [].concat.apply([], arrayOfArrays);

  return flattened
    .reduce((prev, curr) => {
      let d = {
        name: Convert.sentenceToWord(curr.name[0].text.toLowerCase()),
        ypp_offense: parseFloat(curr.numyards_total[0].text) / parseFloat(curr.numplays_total[0].text)
      }

      prev[d.name] = d;

      return prev;
    }, {});
}

module.exports = {
  teamRecords: teamRecords,
  offensiveRanks: offensiveRanks
}