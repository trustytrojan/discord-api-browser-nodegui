const Base = require('./Base');

class Guild extends Base {
  /** @type {string} */ name;
  /** @type {string} */ icon;
  /** @type {string?} */ description;
  /** @type {string?} */ splash;
  /** @type {string?} */ discovery_splash;
  /** @type {string[]} */ features;
  /** @type {any[]} */ emojis;
  /** @type {any[]} */ stickers;
  /** @type {string?} */ banner;
  /** @type {string} */ owner_id;
  /** @type {string?} */ application_id;
  /** @type {string} */ region;
  /** @type {string?} */ afk_channel_id;
  /** @type {number} */ afk_timeout;
  /** @type {string} */ system_channel_id;
  /** @type {boolean} */ widget_enabled;
  /** @type {string?} */ widget_channel_id;
  /** @type {number} */ verification_level;
  /** @type {any[]} */ roles;
  /** @type {number} */ default_message_notifications;
  /** @type {number} */ mfa_level;
  /** @type {number} */ explicit_content_filter;
  /** @type {number?} */ max_presences;
  /** @type {number} */ max_members;
  /** @type {number} */ max_stage_video_channel_users;
  /** @type {number} */ max_video_channel_users;
  /** @type {string?} */ vanity_url_code;
  /** @type {number} */ premium_tier;
  /** @type {number} */ premium_subscription_count;
  /** @type {number} */ system_channel_flags;
  /** @type {string} */ preferred_locale;
  /** @type {string?} */ rules_channel_id;
  /** @type {string?} */ safety_alerts_channel_id;
  /** @type {string?} */ public_updates_channel_id;
  /** @type {string?} */ hub_type;
  /** @type {boolean} */ premium_progress_bar_enabled;
  /** @type {boolean} */ nsfw;
  /** @type {number} */ nsfw_level;
  
  constructor(data, client, partial = false) {
    super(data, client);
    this.copyDefinedPropertiesFrom(data);
    this.partial = partial;
  }

  get descriptor() { return this.name; }

  async fetch() {
    const data = this.client.guilds.fetch(this.id);
    this.copyDefinedPropertiesFrom(data);
    this.partial = false;
    return this;
  }

  /**
   * @param {import('../cdn-utils').ImageURLOptions} options
   * @returns {string}
   */
  iconURL(options) {
    return cdn.icon(this.id, this.icon, options);
  }
};

module.exports = Guild;