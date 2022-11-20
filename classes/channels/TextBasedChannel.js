const BaseChannel = require('./BaseChannel');

class TextBasedChannel extends BaseChannel {
  /** @type {string} */ last_message_id;
  /** @type {string} */ last_pin_timestamp;

  constructor(data, client) {
    super(data, client);
    for(const k in this)
      if(data[k] !== undefined)
        this[k] = data[k];
  }

  get last_pin_at() {
    return new Date(this.last_pin_timestamp);
  }
};

module.exports = TextBasedChannel;