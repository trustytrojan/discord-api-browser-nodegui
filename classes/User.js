const Base = require('./Base');
const cdn = require('../cdn-utils');

class User extends Base {
  /** @type {string} */ username;
  /** @type {string} */ discriminator;
  /** @type {string} */ avatar;
  /** @type {boolean} */ bot;
  /** @type {string} */ banner;
  /** @type {number} */ accent_color;
  avatar_decoration;
  /** @type {number} */ public_flags;
  /** @type {number} */ flags;
  /** @type {string} */ banner_color;
  /** @type {boolean} */ partial;

  constructor(data, client, partial) {
    console.log(data.id);
    super(data, client);
    for(const k in this)
      if(data[k] !== undefined)
        this[k] = data[k];
    this.partial = partial ?? false;
  }

  get tag() {
    return `${this.username}#${this.discriminator}`;
  }

  /**
   * @param {cdn.ImageURLOptions} options
   * @returns {string}
   */
  avatarURL(options) {
    return cdn.avatar(this.id, this.avatar, options);
  }
};

module.exports = User;