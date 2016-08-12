'use strict';

let maps = require('./../maps');

class Calc {

  constructor(array) {
    this.data = array;
    this.winPercentageCeil = 0.0;
    this.oStatsCeil = 0.0;
    this.dStatsCeil = 0.0;
    this.pScoreCeil = 0.0;
  }

  sort(prop) {
    this.data.sort((a, b) => {
      return b[prop] - a[prop];
    });
    return this.data;
  }

  rank() {
    this.data.map((item, i) => {
      return item.rank = i + 1;
    });
    return this.data;
  }

  normalize(input, to, invert) {
    let normalized = parseFloat((input / to) * 100.0);
    return (invert) ? 100.0 - (normalized - 100.0) : normalized;
  }

  ratings(sortBy) {
    
    let wpSorted = this.sort(maps.COLUMN.WIN_PERCENTAGE);
    this.winPercentageCeil = wpSorted[0][maps.COLUMN.WIN_PERCENTAGE];
    
    let oStatsSorted = this.sort(maps.COLUMN.YPP_OFFENSE);
    this.oStatsCeil = oStatsSorted[0][maps.COLUMN.YPP_OFFENSE];

    let dStatsSorted = this.sort(maps.COLUMN.YPP_DEFENSE);
    this.dStatsCeil = dStatsSorted[dStatsSorted.length - 1][maps.COLUMN.YPP_DEFENSE];

    let pScoreSorted = this.sort(maps.COLUMN.RECRUITING_SCORE);
    this.pScoreCeil = pScoreSorted[0][maps.COLUMN.RECRUITING_SCORE];

    function calculateRating(item) {
      return (item.win_percentage_rating * 0.45) + 
        (item.ypp_offense_rating * 0.15) + 
        (item.ypp_defense_rating * 0.2) + 
        (item.recruiting_score_rating * 0.2) + 
        (item.ats)
    }

    this.data.map((item) => {
      item.update(maps.COLUMN.WIN_PERCENTAGE_RATING, this.normalize(item.win_percentage, this.winPercentageCeil));
      item.update(maps.COLUMN.YPP_OFFENSE_RATING, this.normalize(item.ypp_offense, this.oStatsCeil));
      item.update(maps.COLUMN.YPP_DEFENSE_RATING, this.normalize(item.ypp_defense, this.dStatsCeil, true));
      item.update(maps.COLUMN.RECRUITING_SCORE_RATING, this.normalize(item.recruiting_score, this.pScoreCeil))
      item.update(maps.COLUMN.TOTAL_RATING, calculateRating(item));
      return item;
    });

    let sortByColumn = maps.COLUMN[sortBy.toUpperCase()] || maps.COLUMN.TOTAL_RATING;
    
    let sorted = this.sort(sortByColumn);
    return this.rank(sorted);
  }
}

module.exports = Calc;