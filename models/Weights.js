'use strict';

class Weights {
  constructor(weights) {
    this.win_percentage_weight = (weights) ? weights.win_percentage_weight : 0.45;
    this.ypp_offense_weight = (weights) ? weights.ypp_offense_weight : 0.15;
    this.ypp_defense_weight = (weights) ? weigts.ypp_defense_weight : 0.2;
    this.recruiting_score_weight = (weights) ? weights.recruiting_score_weight : 0.2;
  }
}

module.exports = Weights;