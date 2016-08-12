'use strict';

const nameMap = {
  'n.c. state': 'North Carolina State',
  'southern methodist': 'SMU',
  'texas-san antonio': 'Texas San Antonio',
  'mississippi': 'Ole Miss',
  'brigham young': 'BYU',
  'utep': 'Texas El Paso',
  'fiu': 'Florida International',
  'fau': 'Florida Atlantic',
  'bowling green': 'Bowling Green State',
  'texas christian': 'TCU',
  'miami (fl)': 'Miami',
  'louisiana-monroe': 'Louisiana Monroe',
  'louisiana-lafayette': 'Louisiana Lafayette',
  'southern miss': 'Southern Mississippi',
  'south florida': 'USF',
  'central florida': 'UCF',
  'boston': 'Boston College',
  'boston col': this.boston,
  'connecticut': 'UConn'
};

function normalize(name) {
  return nameMap[name.toLowerCase()] || name;
}

module.exports = {
  normalize: normalize
};