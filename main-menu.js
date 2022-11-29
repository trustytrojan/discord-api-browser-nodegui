const Client = require('./classes/Client');
const style_sheet = require('./style-sheet');
const { TabPosition, Direction, QMainWindow, QTreeWidget, QTabWidget, QIcon, QMenuBar, QMenu, QAction } = require('@nodegui/nodegui');
const { _QLabel, _QPushButton, _QBoxLayout, _QTreeWidgetItem, _QAction } = require('./custom-constructors');
const { wrap_layout } = require('./utils');

const no_icon = new QIcon();

class MainMenu extends QMainWindow {
  /** @type {Client} */ client;

  constructor(client) {
    super();
    this.client = client;
    this.setWindowTitle('Discord API Browser');
    this.setStyleSheet(style_sheet);
    this.setMinimumSize(800, 600);

    const fetch_friends = _QAction('Fetch Friends', () => {

    });
  }
}


const fetch_menu = new QMenu();
fetch_menu.

new QAction().addEventListener('triggered', () =>)

const menu_bar = new QMenuBar();
menu_bar.addMenu(fetch_menu);

mw.setMenuBar(menu_bar);

/**
 * For guilds,channels,users
 * @param {Client} client 
 * @param {'guilds' | 'channels' | 'users'} elementType
 */
function generateTab(client, elementType) {
  const data = client[elementType].cache;
  if(data.size === 0) {
    const without_the_s = elementType.substring(0, elementType.length-1);
    return _QLabel(`${without_the_s} cache is empty`);
  }
  const tree = new QTreeWidget();
  tree.setColumnCount(2);
  const name_column = {
    guilds: 'name',
    channels: 'name / description',
    users: 'tag'
  }[elementType];
  tree.setHeaderLabels(['id', name_column]);
  for(const [k, { name, tag }] of data) {
    tree.addTopLevelItem(_QTreeWidgetItem([k, name ?? tag]));
  }
  return tree;
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
  const tree = new QTreeWidget();
  tree.setColumnCount(2);
  tree.setHeaderLabels(['key', 'value']);
  for(const k in client.user) {
    if(typeof client.user[k] !== 'string') continue;
    tree.addTopLevelItem(_QTreeWidgetItem([k, client.user[k]]));
  }
  return tree;
}

function generateTabWidget(client) {
  const tabw = new QTabWidget();
  tabw.setTabPosition(TabPosition.West);
  for(const s of ['Guilds', 'Channels', 'Users'])
    tabw.addTab(generateTab(client, s.toLowerCase()), no_icon, s);
  tabw.addTab(clientUserTab(client), no_icon, 'Me');
  return tabw;
}

module.exports = {
  main_window: mw,

  /** @param {Client} client */
  updateTabs: (client) => mw.setCentralWidget(generateTabWidget(client))
};