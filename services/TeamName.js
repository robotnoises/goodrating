'use strict';

const nameMap = {
  'n.c. state': 'North Carolina State',
  'n c state': 'North Carolina State',
  'southern methodist': 'SMU',
  'texas-san antonio': 'Texas San Antonio',
  'texas el paso': 'UTEP',
  'texas-el paso': 'UTEP',
  'tx el paso': 'UTEP',
  'mississippi': 'Ole Miss',
  'brigham young': 'BYU',
  'fiu': 'Florida International',
  'florida intl': this.fiu,
  'fau': 'Florida Atlantic',
  'bowling green': 'Bowling Green State',
  'bowling grn': 'Bowling Green State',
  'texas christian': 'TCU',
  'miami (fl)': 'Miami',
  'louisiana-monroe': 'Louisiana Monroe',
  'louisiana-lafayette': 'Louisiana Lafayette',
  'southern miss': 'Southern Mississippi',
  'south florida': 'USF',
  'central florida': 'UCF',
  'boston': 'Boston College',
  'boston col': this.boston,
  'connecticut': 'UConn',
  'ga tech': 'Georgia Tech',
  'la lafayette': 'Louisiana Lafayette',
  'e carolina': 'East Carolina',
  's alabama': 'South Alabama',
  'kansas st': 'Kansas State',
  'san jose st': 'San Jose State',
  'arizona st': 'Arizona State',
  'central mich': 'Central Michigan',
  'middle tenn': 'Middle Tennessee',
  'va tech': 'Virginia Tech',
  'colorado st': 'Colorado State',
  'n illinois': 'Northen Illinois',
  's florida': 'USF',
  'w michigan': 'Western Michigan',
  'w virginia': 'West Virginia',
  's mississippi': 'Southern Mississippi',
  'wash state': 'Washington State',
  'ga southern': 'Georgia Southern',
  'miss state': 'Mississippi State',
  'arkansas st': 'Arkansas State',
  'la tech': 'Louisiana Tech',
  'louisiana state': 'LSU',
  'louisiana st': 'LSU',
  'oklahoma st': 'Oklahoma State',
  'florida st': 'Florida State',
  'n carolina': 'North Carolina',
  'san diego st': 'San Diego State',
  'tx christian': 'TCU',
  'app state': 'Appalachian State',
  'w kentucky': 'Western Kentucky',
  'michigan st': 'Michigan State'
};

function normalize(name) {
  return nameMap[name.toLowerCase()] || name;
}

module.exports = {
  normalize: normalize
};