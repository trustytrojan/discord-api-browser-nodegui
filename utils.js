const {
  QTreeWidget, QTreeWidgetItem, TabPosition, QTabWidget, QIcon, QMainWindow,
  QWidget, EchoMode, QLineEdit, AlignmentFlag, QLabel, QPushButton, QLayout,
} = require('@nodegui/nodegui');

/**
 * @param {{
 *   columns: string[]
 * }}
 */
function _QTreeWidgetItem({  }) {
  const item = new QTreeWidgetItem();
  for(let i = 0; i < columns.length; ++i)
    item.setText(i, columns[i]);
  return item;
}

/**
 * @param {{
 *   column_count: number,
 *   items: QTreeWidgetItem[]
 * }}
 */
function _QTreeWidget({ column_count, items }) {
  const tree = new QTreeWidget();
  tree.setColumnCount(column_count);
  for(const item of items)
    tree.addTopLevelItem(item);
  return tree;
}

/**
 * @typedef QTabWidgetTab
 * @prop {QWidget} page
 * @prop {QIcon} icon
 * @prop {string} label
 */
/**
 * @param {{
 *   tabs: QTabWidgetTab[],
 *   tab_position: TabPosition
 * }}
 */
function _QTabWidget({ tabs, tab_position }) {
  const tabw = new QTabWidget();
  if(tabs)
    for(const { page, icon = new QIcon(), label } of tabs)
      tabw.addTab(page, icon, label);
  if(tab_position) tabw.setTabPosition(tab_position);
  return tabw;
}

/**
 * @param {{
 *   echo_mode: EchoMode
 * }} 
 */
function _QLineEdit({ echo_mode }) {
  const le = new QLineEdit();
  le.setEchoMode(echo_mode);
  return le;
}

/**
 * @param {{
 *   text: string,
 *   alignment: AlignmentFlag
 * }}
 */
function _QLabel({ text, alignment }) {
  const label = new QLabel();
  label.setText(text);
  label.setAlignment(alignment);
  return label;
}

/**
 * @param {{
 *   text: string
 * }} 
 */
function _QPushButton({ text }) {
  const button = new QPushButton();
  button.setText(text);
  return button;
}

/**
 * @param {{
 *   show: boolean,
 *   layout: QLayout,
 *   central_widget: QWidget,
 *   dimensions: {
 *     min: [number, number]
 *   },
 *   style_sheet: string
 * }}
 */
function _QMainWindow({ show, layout, central_widget, dimensions, style_sheet }) {
  if(layout && central_widget)
    throw new TypeError('arguments "layout" and "central_widget" are mutually exclusive');
  const mw = new QMainWindow();
  if(layout) {
    const w = new QWidget();
    w.setLayout(layout);
    mw.setCentralWidget(w);
  }
  if(central_widget)
    mw.setCentralWidget(central_widget);
  if(dimensions) {
    const { min } = dimensions;
    if(min) {
      const [w,h] = min;
      mw.setMinimumSize(w, h);
    }
  }
  if(style_sheet)
    mw.setStyleSheet(style_sheet);
  if(show)
    mw.show();
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

if(process.argv[1].endsWith('utils')){
  let current_file = process.argv[1];
  //if(!current_file.startsWith('./')) current_file = `./${current_file}`;
  if(!current_file.endsWith('.js')) current_file += '.js';
  const { readFileSync, appendFileSync } = require('fs');
  const code = readFileSync(current_file).toString();
  const functions = code.split('function ').map(v => v.substring(0, v.indexOf('('))).filter(v => v.length > 0 && v.includes('_Q'));
  let str = '\n\nmodule.exports = {';
  for(const fn of functions) {
    str += `\n  get ${fn}() { return ${fn}; },`;
  }
  appendFileSync(current_file, (str += '\n};'));
}

module.exports = {
  get _QTreeWidgetItem() { return _QTreeWidgetItem; },
  get _QTreeWidget() { return _QTreeWidget; },
  get _QTabWidget() { return _QTabWidget; },
  get _QLineEdit() { return _QLineEdit; },
  get _QLabel() { return _QLabel; },
  get _QPushButton() { return _QPushButton; },
  get _QMainWindow() { return _QMainWindow; },
  get _QGridLayout() { return _QGridLayout; },
  get _QBoxLayout() { return _QBoxLayout; },
};