const {
  QWidget, QLayout,
} = require('@nodegui/nodegui');

/**
 * @param {QLayout} layout
 */
function wrap_layout(layout) {
  const widget = new QWidget();
  widget.setLayout(layout);
  return widget;
}

module.exports = {
  get wrap_layout() { return wrap_layout; },
};