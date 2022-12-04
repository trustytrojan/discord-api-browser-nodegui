const Base = require('../Base');
const channel_types = require('./ChannelType');

class BaseChannel extends Base {
  /** @type {number} */ type;
  /** @type {boolean} */ partial;

  constructor(data, client, partial) {
    super(data, client);
    for(const k in this)
      if(data[k] !== undefined)
        this[k] = data[k];
    this.partial = partial;
  }

  get typeString() {
    return channel_types.to_string(this.type);
  }
}

module.exports = BaseChannel;