'use strict';

class ObjectMapper {
  
  constructor(object) { 
    this.object = object || null;
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

  combine() {
    let objsToCombine = Array.prototype.slice.call(arguments, this.combine.length);
    let combined = objsToCombine[0];
    
    // This is bad... O(n^2)...
    for (var i = 1, max = objsToCombine.length; i < max; i++) {
      for (let key in objsToCombine[i]) {
        if (combined.hasOwnProperty(key)) {
          combined[key] = Object.assign(combined[key], objsToCombine[i][key])
        } else {
          combined[key] = objsToCombine[i][key];
        }
      }
    }

    return combined;
  }
}

module.exports = ObjectMapper;