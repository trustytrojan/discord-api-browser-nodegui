const Client = require('./classes/Client');
const style_sheet = require('./style-sheet');
const { TabPosition, QMainWindow, QTabWidget, QIcon } = require('@nodegui/nodegui');
const { _QAction } = require('./custom-constructors');
const { createTab, createMeTab } = require('./tab-generator');

const no_icon = new QIcon();

/** @type {Client} */
let client;

const mw = new QMainWindow();
mw.setWindowTitle('Discord API Browser');
mw.setStyleSheet(style_sheet);
mw.setMinimumSize(800, 600);

const tabw = new QTabWidget();
tabw.setTabPosition(TabPosition.West);

function create_menus_and_actions() {
  const fetch_menu = mw.menuBar().addMenu('Fetch');

  fetch_menu.addAction(_QAction('Fetch Guilds', async () => {
    await client.guilds.fetchAll();
    tabw.removeTab(0);
    tabw.insertTab(0, createTab('guilds'), no_icon, 'Guilds');
  }));

  fetch_menu.addAction(_QAction('Fetch DMs', async () => {
    await client.channels.fetchDMs();
    tabw.removeTab(1);
    tabw.insertTab(1, createTab('channels'), no_icon, 'Channels');
  }));

  fetch_menu.addAction(_QAction('Fetch Friends', async () => {
    await client.users.fetchFriends();
    tabw.removeTab(2);
    tabw.insertTab(2, createTab('users'), no_icon, 'Users');
  }));
}

function create_and_add_tabs() {
  for(const s of ['Guilds', 'Channels', 'Users'])
    tabw.addTab(createTab(client, s.toLowerCase()), no_icon, s);
  tabw.addTab(createMeTab(client, tabw), no_icon, 'Me');
}

// function clearTabs() {
//   try { for(let i = 0;; ++i) tabw.removeTab(i); }
//   catch(err) { void err; }
// }

/**
 * @param {Client} c 
 */
module.exports = function(c) {
  client = c;
  create_menus_and_actions();
  create_and_add_tabs();
  mw.show();
};