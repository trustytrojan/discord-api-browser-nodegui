class ChannelType {
  static get GuildText() { return 0; }
  static get DM() { return 1; }
  static get GuildVoice() { return 2; }
  static get GroupDM() { return 3; }
  static get GuildCategory() { return 4; }
  static get GuildAnnouncement() { return 5; }
  static get AnnouncementThread() { return 10; }
  static get PublicThread() { return 11; }
  static get PrivateThread() { return 12; }
  static get GuildStageVoice() { return 13; }
  static get GuildDirectory() { return 14; }
  static get GuildForum() { return 15; }

  // /**
  //  * @param {number} x discord channel type represnted as integer
  //  * @returns {string} normal-person readable channel type
  //  */
  // access with []
  static get toString() {
    return {
      0: 'Text Channel',
      1: 'DM Channel',
      2: 'Voice Channel',
      3: 'Group DM Channel',
      4: 'Category Channel',
      5: 'Announcement Channel',
      10: 'Announcement Thread',
      11: 'Public Thread',
      12: 'Private Thread',
      13: 'Stage Channel',
      14: 'GuildDirectory',
      15: 'Forum Channel'
    };
  }
}

module.exports = ChannelType;