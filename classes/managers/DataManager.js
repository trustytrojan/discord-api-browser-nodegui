const Client = require('../Client');

/** @param {number} x */
const wait = (x) => new Promise((resolve) => setTimeout(resolve, x));

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
   */
  async fetch(api_path) {
    const url = `https://discord.com/api/v9${api_path}`;
    console.log(`Fetching ${url}...`);

    const fetch = (await import('node-fetch')).default;
    const resp = await fetch(url, { headers: { authorization: this.client.token } });
    const data = await resp.json();

    // discord responds with a `message` property to indicate an error
    if(!resp.ok) {
      console.error(`bad status received: ${resp.status}`);
      switch(resp.status) {
        case 429: throw 'requesting too fast!';
        case 403: throw 'we are forbidden from this page!';
        default: throw resp.statusText;
      }
    }

    return data;
  }
};

module.exports = DataManager;