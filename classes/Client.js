const UserManager = require('./managers/UserManager');
const ClientUser = require('./ClientUser');
const ChannelManager = require('./managers/ChannelManager');
const GuildManager = require('./managers/GuildManager');
const RelationshipManager = require('./managers/RelationshipManager');

module.exports = class Client {
  /** @type {string} */ token;
  /** @type {ClientUser} */ user;
  /** @type {UserManager} */ users;
  /** @type {ChannelManager} */ channels;
  /** @type {GuildManager} */ guilds;
  /** @type {RelationshipManager} */ relationships;

  constructor() {
    this.users = new UserManager(this);
    this.channels = new ChannelManager(this);
    this.guilds = new GuildManager(this);
    this.relationships = new RelationshipManager(this);
  }

  /**
   * @param {string} token 
   */
  async login(token) {
    this.token = token;
    this.user = await this.users.fetchMe();
    console.log(`Client successfully logged in as ${this.user.tag}!`);
  }
};