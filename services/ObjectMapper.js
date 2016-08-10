'use strict';

class ObjectMapper {
  
  constructor(object) { 
    this.object = object;
  }

  add(obj) {
    
    for (let key in obj) {
      if (this.object.hasOwnProperty(key)) {
        this.object[key].score = this.object[key].score + obj[key].score;
      } else {
        this.object[key] = obj[key];
      }
    }

    return this.object;
  }
}

module.exports = ObjectMapper;