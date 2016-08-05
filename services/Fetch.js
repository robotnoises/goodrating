'use strict';

var fs = require('fs');
var https = require('https');
var enums = require('./../enums');
/**
 * filepathHandler(location)
 * 
 * A handler function that fetches json data from the filesystem.
 */

function filepathHandler(location) {
  if (location) {
    console.log('Not implemented yet');
  } else {
    throw new Error('Location is required.');
  }
}

/**
 * apiHandler(location);
 * 
 * A handler function that fetches json data from an API endpoint; 
 */

function apiHandler(location) {
  if (location) {
    return new Promise((resolve, reject) => {
      https.get(location, (response) => {
        let raw = '';

        response.on('data', (chunk) => {
          raw += chunk;
        });
        
        response.on('end', () => {
          try {
            resolve(JSON.parse(raw));
          } catch (ex) {
            reject(ex);
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  } else {
    throw new Error('Location is required.');
  }
}

/**
 * getHandler(source)
 * 
 * A Fetch handler factory. 
 */

function getHandler(source) {
  if (source && source === enums.SOURCE.FILEPATH) {
    return filepathHandler;
  } else if (source && source === enums.SOURCE.API) {
    return apiHandler;
  } else {
    throw new Error(`Source ${source} is unsupported`);
  }
}

class Fetch {

  constructor() { 
    this.source = null;
    this.handler = null;
  }

  by(source) {
    this.source = source;
    this.handler = getHandler(source);
    
    return this;
  }

  at(location) {
    if (this.source && this.handler) {
      return this.handler(location);
    } else {
      throw new Error('Fetch must include a source (.by(source)).');
    }
  }
}

module.exports = Fetch;