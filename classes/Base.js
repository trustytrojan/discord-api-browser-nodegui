const Client = require('./Client');
const { timestampFrom } = require('../utils');

class Base {
  /** @type {Client} */ client;
  /** @type {string} */ id;
  /** @type {Date} */ created;
  
  constructor({ id }, client) {
    this.client = client;
    this.id = id;
    this.created = new Date(timestampFrom(this.id));
  }

  // for all subclasses convenience
  copyDefinedPropertiesFrom(data) {
    for(const k in this) {
      if(data[k] === undefined) continue;
      this[k] = data[k];
    }
  }
};

module.exports = Base;