const {
  QWidget, QLayout,
} = require('@nodegui/nodegui');

/**
 * @param {QLayout} layout
 */
function wrapLayoutWithWidget(layout) {
  const widget = new QWidget();
  widget.setLayout(layout);
  return widget;
}

module.exports = { wrapLayoutWithWidget };