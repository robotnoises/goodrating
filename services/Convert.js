'use strict';

function percentToFloat(percent) {
  let float = parseFloat(percent);
  return float * 0.01;
}

function stringToFloat(str) {
  let float = parseFloat(str);
  return float;
}

function sentenceToWord(sentence) {
  return sentence.replace(/[\s\(\)&]/gi, '');
}

module.exports = {
  percentToFloat: percentToFloat,
  stringToFloat: stringToFloat,
  sentenceToWord: sentenceToWord
};