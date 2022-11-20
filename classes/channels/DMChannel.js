const TextBasedChannel = require('./TextBasedChannel');
const User = require('../User');

class DMChannel extends TextBasedChannel {
  /** @type {User} */ recipient;

  constructor(data, client) {
    super(data, client);
    this.recipient = data.recipients[0];
    this.fetchRecipient();
  }

  async fetchRecipient() {
    return this.recipient = await this.client.users.fetch(this.recipient.id);
  }

  get name() {
    const { tag, username, discriminator } = this.recipient;
    return `DM with ${tag ?? `${username}#${discriminator}`}`;
  }
};

module.exports = DMChannel;