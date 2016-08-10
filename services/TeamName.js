'use strict';

const nameMap = {
  'usf': 'South Florida',
  'ucf': 'Central Florida',
  'n.c. state': 'North Carolina State',
  'smu': 'Southern Methodist',
  'texas-san antonio': 'Texas San Antonio',
  'ole miss': 'Mississippi',
  'brigham young': 'BYU',
  'utep': 'Texas El Paso',
  'fiu': 'Florida International',
  'fau': 'Florida Atlantic',
  'bowling green': 'Bowling Green State',
  'texas christian': 'TCU',
  'miami (fl)': 'Miami',
  'louisiana-monroe': 'Louisiana Monroe',
  'louisiana-lafayette': 'Louisiana Lafayette',
  'southern miss': 'Southern Mississippi'
};

function normalize(name) {
  return nameMap[name.toLowerCase()] || name;
}

module.exports = {
  normalize: normalize
};