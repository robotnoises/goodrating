'use strict';

class ObjectUtils {
  
  constructor(object) { 
    this.object = object || null;
  }

  add(obj, prop) {
    
    for (let key in obj) {
      if (this.object.hasOwnProperty(key)) {
        this.object[key][prop] = this.object[key][prop] + obj[key][prop];
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

  toArray(Model) {
    let array = [];
    for (let key in this.object) {
      let model = (Model) ? new Model(this.object[key]) : this.object[key];
      array.push(model);
    }
    return array;
  }
}

module.exports = ObjectUtils;