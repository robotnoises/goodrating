'use strict';

class Rating {
  
  constructor (data) {
    this.name = data.name || '';
    this.win_percentage = data.win_percentage || 0.0;
    this.rank_offense = data.rank_offense || 0;
    this.rank_defense = data.rank_defense || 0;
    this.rank_players = data.rank_players || 0;
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