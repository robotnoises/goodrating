'use strict';

class Rating {
  
  constructor (data) {
    this.name = data.name || '';
    this.slug = data.slug|| '';
    this.win_percentage = data.win_percentage || 0.0;
    this.ypp_offense = data.ypp_offense || 0;
    this.ypp_defense = data.ypp_defense || 8.0;
    this.recruiting_score = data.recruiting_score || 0;
    
    this.ats = data.ats || 0.0;
    this.sos = data.sos || 0.0;
    this.win_percentage_rating = data.win_percentage_rating || 0.0;
    this.ypp_offense_rating = data.offense_rating || 0.0;
    this.ypp_defense_rating = data.defense_rating || 0.0;
    this.recruiting_score_rating = data.player_rating || 0.0;
    
    this.adjustments = 0.0
    this.total_rating = 0.0;
  }

  update(key, value) {
    if (this.hasOwnProperty(key)) {
      this[key] = value;
    } else {
      throw new Error(`Invalid property: ${key}.`)
    }
  }
}

module.exports = Rating;