'use strict';

class Weights {
  constructor(w) {
    this.win_percentage_weight = (w && w.win_percentage_rating) ? parseInt(w.win_percentage_rating) * 0.01: 0.45;
    this.ypp_offense_weight = (w && w.ypp_offense_rating) ? parseInt(w.ypp_offense_rating) * 0.01 : 0.15;
    this.ypp_defense_weight = (w && w.ypp_defense_rating) ? parseInt(w.ypp_defense_rating) * 0.01 : 0.2;
    this.recruiting_score_weight = (w && w.recruiting_score_rating) ? parseInt(w.recruiting_score_rating) * 0.01 : 0.2;
  }
}

module.exports = Weights;