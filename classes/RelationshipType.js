class RelationshipType {
  static get None() { return 0; }
  static get Friend() { return 1; }
  static get Blocked() { return 2; }
  static get PendingIncoming() { return 3; }
  static get PendingOutgoing() { return 4; }
  static get Implicit() { return 5; }

  /**
   * @param {number} x 
   * @returns {string}
   */
  static toString(x) {
    return {
      0: 'No relationship',
      1: 'Friend',
      2: 'Blocked',
      3: 'Incoming Friend Request',
      4: 'Outgoing Friend Request',
      5: 'Not friends, frequent interaction'
    }[x];
  }
}

module.exports = RelationshipType;