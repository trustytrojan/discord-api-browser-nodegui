const Client = require('./classes/Client');
const style_sheet = require('./style-sheet');
const { TabPosition, Direction, QMainWindow, QTreeWidget, QTabWidget, QIcon } = require('@nodegui/nodegui');
const { _QLabel, _QPushButton, _QBoxLayout, _QTreeWidgetItem, _QAction } = require('./custom-constructors');
const { wrap_layout } = require('./utils');

const no_icon = new QIcon();

/** @type {Client} */
let client;

/** @type {QMainWindow} */
let mw;

function updateTabs() {
  mw.setCentralWidget(generateTabWidget());
}

function createMenus() {
  const fetch_menu = mw.menuBar().addMenu('Fetch');
  fetch_menu.addAction(_QAction('Fetch Friends', async () => {
    await client.users.fetchFriends();
    
  }));
  fetch_menu.addAction(_QAction('Fetch DMs', () => client.channels.fetchDMs().then(updateTabs)));
  fetch_menu.addAction(_QAction('Fetch Guilds', () => client.guilds.fetchAll().then(updateTabs)));
}

/**
 * For guilds,channels,users
 * @param {'guilds' | 'channels' | 'users'} elementType
 */
function generateTab(elementType) {
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
  for(const [k, { name, tag }] of data)
    tree.addTopLevelItem(_QTreeWidgetItem([k, name ?? tag]));
  return tree;
}

function clientUserTab() {
  if(!client.user) {
    const label = _QLabel('no user login');
    const login_btn = _QPushButton('login', () => {
      require('./login-form')(client);
      mw.setCentralWidget(generateTabWidget());
    });
    const layout = new _QBoxLayout(Direction.TopToBottom, [label, login_btn]);
    return wrap_layout(layout);
  }
  const tree = new QTreeWidget();
  tree.setColumnCount(2);
  tree.setHeaderLabels(['key', 'value']);
  for(const k in client.user) {
    if(client.user[k] === undefined) continue;
    tree.addTopLevelItem(_QTreeWidgetItem([k, String(client.user[k])]));
  }
  return tree;
}

function generateTabWidget() {
  const tabw = new QTabWidget();
  tabw.setTabPosition(TabPosition.West);
  for(const s of ['Guilds', 'Channels', 'Users'])
    tabw.addTab(generateTab(s.toLowerCase()), no_icon, s);
  tabw.addTab(clientUserTab(), no_icon, 'Me');
  return tabw;
}

/**
 * @param {Client} c 
 */
module.exports = function(c) {
  client = c;
  mw = new QMainWindow();
  mw.setWindowTitle('Discord API Browser');
  mw.setStyleSheet(style_sheet);
  mw.setMinimumSize(800, 600);
  createMenus();
  updateTabs();
  mw.show();
  global.mw = mw;
};