const Client = require('../Client');

class DataManager {
  /** @type {Client} */ client;
  /** @type {Map<string,any>} */ cache;

  /**
   * @param {Client} client 
   */
  constructor(client) {
    this.client = client;
    this.cache = new Map();
  }

  /**
   * Returns the raw JSON object received by the Discord API at the desired path.
   * @param {string} api_path Should take the form of `/path/id`
   * @returns {any}
   */
  async fetch(api_path) {
    api_path = `/api/v9${api_path}`;
    console.log(`Fetching https://discord.com${api_path}`);

    const req = require('https').get({
      host: 'discord.com',
      path: api_path,
      headers: {
        authorization: this.client.token
      }
    });
    const [res] = await once(req, 'response');
    let data = '';
    res.on('data', (chunk) => data += chunk);
    await require('events').once(res, 'end');
    const obj = JSON.parse(data);

    // discord responds with a `message` property to indicate an error
    if(obj.message) {
      console.error(obj);
      throw 'Invalid token!';
    }

    return obj;
  }
};

module.exports = DataManager;