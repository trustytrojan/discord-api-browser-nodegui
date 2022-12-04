const Base = require('./Base');
const Client = require('./Client');
const User = require('./User');

class Relationship extends Base {
  /** @type {number} */ type;
  /** @type {string} */ nickname;
  /** @type {User} */ user;

  /**
   * @param {*} data 
   * @param {Client} client 
   */
  constructor(data, client) {
    super(data, client);
    for(const k in this)
      if(data[k] !== undefined)
        this[k] = data[k];
    this.user = new User(data.user, client, true);
    client.users.cache.set(data.id, this.user);
  }
}

module.exports = Relationship;