const Base = require('./Base');
const cdn = require('../cdn-utils');
const { QTreeWidget } = require('@nodegui/nodegui');
const { _QTreeWidgetItem } = require('../custom-constructors');

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
    super(data, client);
    for(const k in this)
      if(data[k] !== undefined)
        this[k] = data[k];
    this.partial = partial ?? false;
  }

  get tag() { return `${this.username}#${this.discriminator}`; }
  get descriptor() { return this.tag; }

  async fetch() {
    const data = await this.client.users.fetch(this.id);
    this.copyDefinedPropertiesFrom(data);
    return this;
  }

  /**
   * @param {cdn.ImageURLOptions} options
   * @returns {string}
   */
  avatarURL(options) {
    return cdn.avatar(this.id, this.avatar, options);
  }

  get treeWidget() {
    const tree = new QTreeWidget();
    for(const k in this) {
      if(this[k] === undefined) continue;
      tree.addTopLevelItem(_QTreeWidgetItem([k, String(this[k])]));
    }
    return tree;
  }
};

module.exports = User;