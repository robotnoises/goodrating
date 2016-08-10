'use strict';

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

  normalize(input, to, invert) {
    let normalized = parseFloat((input / to) * 100.0);
    return (invert) ? 100.0 - (normalized - 100.0) : normalized;
  }

  ratings() {
    let wpSorted = this.sort('win_percentage');
    this.winPercentageCeil = wpSorted[0]['win_percentage'];
    
    let oStatsSorted = this.sort('ypp_offense');
    this.oStatsCeil = oStatsSorted[0]['ypp_offense'];

    let dStatsSorted = this.sort('ypp_defense');
    this.dStatsCeil = dStatsSorted[dStatsSorted.length - 1]['ypp_defense'];

    let pScoreSorted = this.sort('recruiting_score');
    this.pScoreCeil = pScoreSorted[0]['recruiting_score'];

    function calculateRating(item) {
      return (item.win_percentage_rating * 0.4) + 
        (item.ypp_offense_rating * 0.2) + 
        (item.ypp_defense_rating * 0.2) + 
        (item.recruiting_score_rating * 0.2) + 
        (item.ats)
    }

    this.data.map((item) => {
      item.update('win_percentage_rating', this.normalize(item.win_percentage, this.winPercentageCeil));
      item.update('ypp_offense_rating', this.normalize(item.ypp_offense, this.oStatsCeil));
      item.update('ypp_defense_rating', this.normalize(item.ypp_defense, this.dStatsCeil, true));
      item.update('recruiting_score_rating', this.normalize(item.recruiting_score, this.pScoreCeil))
      item.update('total_rating', calculateRating(item));
      
      return item;
    });

    return this.sort('total_rating');
  }
}

module.exports = Calc;