const DataManager = require('./DataManager');
const User = require('../User');
const ClientUser = require('../ClientUser');

class UserManager extends DataManager {
  /**
   * @param {Client} client The client that instantiated this
   */
  constructor(client) {
    super(client, User);
    /** @type {Map<string,User>} */ this.cache;
  }

  /**
   * Fetches and, if not already cached, caches the desired User object from Discord.
   * @param {string} id 
   * @param {boolean | undefined} force
   * @returns {Promise<User>}
   */
  async fetch(id, force) {
    if(!force) {
      const cached = this.cache.get(id);
      if(cached) return cached;
    }
    const data = await super.fetch(`/users/${id}`);
    return this.cache.set(id, new User(data, this.client)).get(id);
  }

  /**
   * Should only be used by the Client class for fetching the user associated with its token.
   * @returns {Promise<ClientUser>}
   */
  async fetchMe() {
    const data = await super.fetch('/users/@me');
    return this.cache.set(data.id, new ClientUser(data, this.client)).get(data.id);
  }

  
};

module.exports = UserManager;