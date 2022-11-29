const {
  QTreeWidgetItem,
  QWidget, EchoMode, QLineEdit, AlignmentFlag, QLabel, QPushButton, QLayout,
  QBoxLayout, QGridLayout, QAction,
} = require('@nodegui/nodegui');

/**
 * @param {string} text
 * @param {(checked: boolean) => void} onclick
 */
function _QAction(text, onclick) {
  const action = new QAction();
  action.setText(text);
  action.addEventListener('triggered', onclick);
  return action;
}

/**
 * @param {string[]} columns
 */
function _QTreeWidgetItem(columns) {
  const item = new QTreeWidgetItem();
  for(let i = 0; i < columns.length; ++i)
    item.setText(i, columns[i]);
  return item;
}

/**
 * @param {EchoMode} echo_mode
 */
function _QLineEdit(echo_mode) {
  const le = new QLineEdit();
  if(echo_mode) le.setEchoMode(echo_mode);
  return le;
}

/**
 * @param {string} text
 * @param {AlignmentFlag} alignment
 */
function _QLabel(text, alignment = AlignmentFlag.AlignCenter) {
  const label = new QLabel();
  label.setText(text);
  label.setAlignment(alignment);
  return label;
}

/**
 * @param {string} text
 * @param {(checked: boolean) => void} onclick
 */
function _QPushButton(text, onclick) {
  const button = new QPushButton();
  button.setText(text);
  button.addEventListener('clicked', onclick);
  return button;
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

module.exports = {
  _QAction,
  _QTreeWidgetItem,
  _QLineEdit,
  _QLabel,
  _QPushButton,
  _QGridLayout,
  _QBoxLayout
};