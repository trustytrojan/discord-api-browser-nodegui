const Client = require('./classes/Client');
const style_sheet = require('./style-sheet');
const { TabPosition, Direction, QMainWindow } = require('@nodegui/nodegui');
const { _QLabel, _QTreeWidget, _QPushButton, _QTabWidget, _QMainWindow, _QBoxLayout } = require('./custom-constructors');
const { wrap_layout } = require('./utils');

/** @type {QMainWindow} */
let mw;

/**
 * For guilds,channels,users
 * @param {Client} client 
 * @param {string} elementType
 */
function generateTab(client, elementType) {
  /** @type {Map<string,any>} */
  const data = client[elementType].cache;
  if(data.size === 0) {
    const without_the_s = elementType.substring(0, elementType.length-1);
    return _QLabel(`${without_the_s} cache is empty`);
  }
  return _QTreeWidget(2, Array.from(data.entries()).map(([k,v]) => [k, v.name ?? v.tag]));
}

/**
 * @param {Client} client 
 */
function clientUserTab(client) {
  if(!client.user) {
    const label = _QLabel('no user login');
    const login_btn = _QPushButton('login', () => {
      require('./login-form')(client);
      mw.setCentralWidget(generateTabWidget(client));
    });
    const layout = new _QBoxLayout(Direction.TopToBottom, [label, login_btn]);
    return wrap_layout(layout);
  }
  return _QTreeWidget(2, Object.entries(client.user).map(([k,v]) => v ? [k, v?.toString()] : undefined));
}

function generateTabWidget(client) {
  const tabs = [];
  for(const s of ['Guilds', 'Channels', 'Users'])
    tabs.push([generateTab(client, s.toLowerCase()), s]);
  tabs.push([clientUserTab(client), 'Me']);
  return _QTabWidget(tabs, TabPosition.West);
}

/**
 * @param {Client} client 
 */
function showMainMenu(client) {
  if(!mw) mw = _QMainWindow('Discord API Browser', generateTabWidget(client), style_sheet, { min: [800,600] });
  mw.show();
}

module.exports = showMainMenu;