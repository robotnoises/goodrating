'use strict';

let maps = require('./../maps');
let Weights = require('./../models/Weights');

class Calc {

  constructor(array, weights) {
    this.data = array;
    this.weights = new Weights(weights);
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
    return (invert) ? 100.0 - (100.0 - normalized) : normalized;
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
      let adjustedATS = (item.ats <= 5.0) ? item.ats : 5.0;
      let adjustedSOS = (item.sos <= 5.0) ? item.sos : 5.0;
      
      item.adjustments = (adjustedATS) + (adjustedSOS);

      return (item.win_percentage_rating * this.weights.win_percentage_weight) + 
        (item.ypp_offense_rating * this.weights.ypp_offense_weight) + 
        (item.ypp_defense_rating * this.weights.ypp_defense_weight) + 
        (item.recruiting_score_rating * this.weights.recruiting_score_weight) + 
        (item.adjustments)
    }

    this.data.map((item) => {
      item.update(maps.COLUMN.WIN_PERCENTAGE_RATING, this.normalize(item.win_percentage, this.winPercentageCeil));
      item.update(maps.COLUMN.YPP_OFFENSE_RATING, this.normalize(item.ypp_offense, this.oStatsCeil));
      item.update(maps.COLUMN.YPP_DEFENSE_RATING, this.normalize(this.dStatsCeil, item.ypp_defense, true));
      item.update(maps.COLUMN.RECRUITING_SCORE_RATING, this.normalize(item.recruiting_score, this.pScoreCeil))
      item.update(maps.COLUMN.TOTAL_RATING, calculateRating.call(this, item));
      return item;
    });

    // Sort the data
    let sortByColumn = maps.COLUMN[sortBy.toUpperCase()] || maps.COLUMN.TOTAL_RATING;
    let sorted = this.sort(maps.COLUMN.TOTAL_RATING);    
    let ranked = this.rank(sorted);
    return (sortByColumn === maps.COLUMN.TOTAL_RATING) ? this.data : this.sort(sortByColumn)
  }
}

module.exports = Calc;