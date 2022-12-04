const DataManager = require('./DataManager');
const User = require('../User');
const Relationship = require('../Relationship');

class RelationshipManager extends DataManager {
  /**
   * @param {Client} client The client that instantiated this
   */
  constructor(client) {
    super(client, User);
    /** @type {Map<string,User>} */ this.cache;
  }

  async fetchAll() {
    const data = await super.fetch(`/users/@me/relationships`);
    for(const relationship of data)
      this.cache.set(relationship.id, new Relationship(relationship, this.client));
  }
}

module.exports = RelationshipManager;