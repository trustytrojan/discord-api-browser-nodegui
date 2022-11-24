const {
  QTreeWidget, QTreeWidgetItem, TabPosition, QTabWidget, QIcon, QMainWindow,
  QWidget, EchoMode, QLineEdit, AlignmentFlag, QLabel, QPushButton, QLayout,
  QBoxLayout, QGridLayout, QDialog,
} = require('@nodegui/nodegui');
const { wrap_layout } = require('./utils');

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
 * @param {number} column_count
 * @param {string[][]} items
 */
function _QTreeWidget(column_count, items) {
  const tree = new QTreeWidget();
  tree.setColumnCount(column_count);
  for(const item of items) {
    if(!item) continue;
    tree.addTopLevelItem(_QTreeWidgetItem(item));
  }
  return tree;
}

/**
 * @param {[QWidget, string, QIcon | undefined][]} tabs
 * @param {TabPosition} tab_position
 */
function _QTabWidget(tabs, tab_position) {
  const tabw = new QTabWidget();
  if(tab_position) tabw.setTabPosition(tab_position);
  for(const [page, label, icon = new QIcon()] of tabs)
    tabw.addTab(page, icon, label);
  return tabw;
}

/**
 * @param {EchoMode} echo_mode
 */
function _QLineEdit(echo_mode) {
  const le = new QLineEdit();
  le.setEchoMode(echo_mode);
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
 * @param {string} title 
 * @param {QLayout} layout 
 * @param {string} style_sheet 
 */
function _QDialog(title, layout, style_sheet) {
  const dialog = new QDialog();
  dialog.setWindowTitle(title);
  dialog.setLayout(layout);
  dialog.setStyleSheet(style_sheet);
  return dialog;
}

/**
 * @param {string} title
 * @param {QLayout | QWidget} l_cw
 * @param {string} style_sheet
 * @param {{
 *   min: [number, number],
 *   max: [number, number],
 *   fixed: [number, number]
 * } | undefined} dimensions
 */
function _QMainWindow(title, l_cw, style_sheet, dimensions) {
  const mw = new QMainWindow();
  mw.setWindowTitle(title);
  if(l_cw instanceof QLayout)
    mw.setCentralWidget(wrap_layout(l_cw));
  else if(l_cw instanceof QWidget)
    mw.setCentralWidget(l_cw);
  mw.setStyleSheet(style_sheet);
  if(dimensions) {
    const { min, max, fixed } = dimensions;
    if(min) {
      const [w,h] = min;
      mw.setMinimumSize(w, h);
    }
    if(max) {
      const [w,h] = max;
      mw.setMaximumSize(w, h);
    }
    if(fixed) {
      const [w,h] = fixed;
      mw.setFixedSize(w,h);
    }
  }
  return mw;
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
  get _QTreeWidgetItem() { return _QTreeWidgetItem; },
  get _QTreeWidget() { return _QTreeWidget; },
  get _QTabWidget() { return _QTabWidget; },
  get _QLineEdit() { return _QLineEdit; },
  get _QLabel() { return _QLabel; },
  get _QPushButton() { return _QPushButton; },
  get _QDialog() { return _QDialog; },
  get _QMainWindow() { return _QMainWindow; },
  get _QGridLayout() { return _QGridLayout; },
  get _QBoxLayout() { return _QBoxLayout; },
};