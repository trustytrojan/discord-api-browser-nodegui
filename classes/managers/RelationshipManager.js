const DataManager = require('./DataManager');
const User = require('../User');

class RelationshipManager extends DataManager {
  /**
   * @param {Client} client The client that instantiated this
   */
  constructor(client) {
    super(client, User);
    /** @type {Map<string,User>} */ this.cache;
  }

  
}