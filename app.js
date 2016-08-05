'use strict';

let Fetch = require('./services/Fetch');
let enums = require('./enums')

console.log('Starting.')

let fetch = new Fetch();

fetch
  .by(enums.SOURCE.API)
  .at('https://extraction.import.io/query/extractor/f28b0752-2894-48b4-b4d7-edc5d00877f4?_apikey=cf5cdb26f89e4dba838d1bea6b487bbe257c901eec824d5b1a53ccae2a7f27e8644276c9848cbed25e9603577289cd6740bf2c484736221c04417e39a8e0626715455e97fbb822e1a692cd0e08017a63&url=http%3A%2F%2F247sports.com%2FSeason%2F2016-Football%2FCompositeTeamRankings')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
