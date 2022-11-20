const { QWidget, QGridLayout, QLayout, QMainWindow, EchoMode, Direction, QBoxLayout } = require('@nodegui/nodegui');

/**
 * @typedef WidgetConstructOptions
 * @prop {string} name
 * @prop {string} text
 * @prop {EchoMode} echo_mode
 */

/**
 * Streamline the construction of certain QWidgets.
 * @param {() => QWidget} constructor 
 * @param {WidgetConstructOptions}
 */
function quick_construct(constructor, { name, text, echo_mode }) {
  const widget = new constructor();
  if(text) widget.setText(text);
  if(name) widget.setObjectName(name);
  if(echo_mode) widget.setEchoMode(echo_mode);
  return widget;
}

/**
 * @typedef GridLayoutAddOptions
 * @prop {QWidget | QLayout} object 
 * @prop {number | undefined} rowSpan
 * @prop {number | undefined} colSpan 
 */

/**
 * @param {(QWidget | QLayout | GridLayoutAddOptions)[][]} grid 
 */
function _QGridLayout(grid) {
  const layout = new QGridLayout();
  for(let r = 0; r < grid.length; ++r) {
    for(let c = 0; c < grid[r].length; ++c) {
      const obj = grid[r][c];
      if(!obj) continue;
      if(obj instanceof QWidget)
        layout.addWidget(obj, r, c);
      else if(obj instanceof QLayout)
        layout.addLayout(obj, r, c);
      else {
        const { object, rowSpan, colSpan } = obj;
        layout.addWidget(object, r, c, rowSpan, colSpan);
      }
    }
  }
  return layout;
}

/**
 * @param {Direction} direction 
 * @param {QWidget[]} widgets 
 */
function _QBoxLayout(direction, widgets) {
  const layout = new QBoxLayout(direction);
  for(const widget of widgets)
    layout.addWidget(widget);
  return layout;
}

/**
 * @param {QMainWindow} mw 
 * @param {QLayout} layout 
 */
function _setLayout(mw, layout) {
  const widget = new QWidget();
  widget.setLayout(layout);
  mw.setCentralWidget(widget);
}

module.exports = {
  get quick_construct() { return quick_construct; },
  get _QGridLayout() { return _QGridLayout; },
  get _QBoxLayout() { return _QBoxLayout; },
  get _setLayout() { return _setLayout; }
};
