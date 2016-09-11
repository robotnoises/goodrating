'use strict';

/**
 * SOURCE
 * 
 * An enum for various data sources.
 */

const SOURCE = {
  'FILEPATH': 0,
  'API': 1
};

/**
 * COLUMN
 * 
 * A map for data columns
 */

const COLUMN = {
  'WIN_PERCENTAGE': 'win_percentage',
  'YPP_OFFENSE': 'ypp_offense',
  'YPP_DEFENSE': 'ypp_defense',
  'RECRUITING_SCORE': 'recruiting_score',
  'ATS': 'ats',
  'ADJUSTMENTS': 'adjustments',
  'WIN_PERCENTAGE_RATING': 'win_percentage_rating',
  'YPP_OFFENSE_RATING': 'ypp_offense_rating',
  'YPP_DEFENSE_RATING': 'ypp_defense_rating',
  'RECRUITING_SCORE_RATING': 'recruiting_score_rating',
  'TOTAL_RATING': 'total_rating'
};

module.exports = {
  SOURCE: SOURCE,
  COLUMN: COLUMN
};