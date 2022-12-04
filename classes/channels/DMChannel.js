const TextBasedChannel = require('./TextBasedChannel');
const User = require('../User');

class DMChannel extends TextBasedChannel {
  /** @type {User} */ recipient;

  constructor(data, client, partial) {
    super(data, client, partial);
    this.recipient = new User(data.recipients[0], this.client, true);
    this.client.users.cache.set(this.recipient.id, this.recipient);
  }

  async fetchRecipient() {
    return this.recipient = await this.client.users.fetch(this.recipient.id, true);
  }

  get descriptor() {
    const { tag, username, discriminator } = this.recipient;
    return `DM with ${tag ?? `${username}#${discriminator}`}`;
  }
};

module.exports = DMChannel;