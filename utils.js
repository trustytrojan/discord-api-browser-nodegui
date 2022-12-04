const { QWidget, QLayout } = require('@nodegui/nodegui');

/**
 * @param {QLayout} layout
 */
function wrapLayoutWithWidget(layout) {
  const widget = new QWidget();
  widget.setLayout(layout);
  return widget;
}

const discord_epoch = 1420070400000n;
/**
 * Retrieves the timestamp field's value from a snowflake.
 * @param {string} id The snowflake to get the timestamp value from.
 * @returns {number} The UNIX timestamp that is stored in `id`.
 */
const timestampFrom = (id) => Number((BigInt(id) >> 22n) + discord_epoch);

module.exports = {
  get wrapLayoutWithWidget() { return wrapLayoutWithWidget; },
  get timestampFrom() { return timestampFrom; }
};