'use strict';

class Rating {
  
  constructor (data) {
    this.name = data.name || '';
    this.win_percentage = data.win_percentage || 0.0;
    this.ypp_offense = data.ypp_offense || 0;
    this.ypp_defense = data.ypp_defense || 0;
    this.recruiting_score = data.recruiting_score || 0;
    this.ats = data.ats || 0;
  }

  update(key, value) {
    if (this.hasOwnProperty(key)) {
      this[key] = value;
    } else {
      throw new Error(`Invalid property: ${key}.`)
    }
  }

  // getViewModel() {
  //   return {
  //     name: '',
  //     win_percentage: '',
  //     rank_offense: '',
  //     rank_defense: '',
  //     rank_players: '',
  //     ats: ''
  //   };
  // }
}

module.exports = Rating;