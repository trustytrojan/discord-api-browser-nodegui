const { QWidget, QGridLayout, QLayout, QMainWindow, EchoMode, Direction, QBoxLayout } = require('@nodegui/nodegui');

/**
 * @typedef ConstructOptions
 * @prop {string} name
 * @prop {string} text
 * @prop {EchoMode} echo_mode
 * @prop {string[]} columns
 */

/**
 * Streamline the construction of certain QWidgets.
 * @param {() => *} constructor 
 * @param {ConstructOptions}
 */
function quick_construct(constructor, { text, echo_mode, columns }) {
  const obj = new constructor();
  if(text) obj.setText(text);
  if(echo_mode) obj.setEchoMode(echo_mode);
  if(columns)
    for(let i = 0; i < columns.length; ++i)
      obj.setText(i, columns[i])
  return obj;
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
