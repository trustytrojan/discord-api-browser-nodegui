const Client = require('./classes/Client');
const style_sheet = require('./style-sheet');
const { TabPosition, QMainWindow, QTabWidget, QIcon, QTreeWidget } = require('@nodegui/nodegui');
const { _QAction } = require('./custom-constructors');
const { createTab, createMeTab, populateTreeWidgetWithMapEntries } = require('./tab-generator');

const no_icon = new QIcon();

const mw = new QMainWindow();
mw.setWindowTitle('Discord API Browser');
mw.setStyleSheet(style_sheet);
mw.setMinimumSize(800, 600);

// the central widget of the window
const tabw = new QTabWidget();
tabw.setTabPosition(TabPosition.West);

mw.setCentralWidget(tabw);

/**
 * @param {Client} client 
 */
module.exports = function(client) {
  
  // add menu and actions
  const fetch_menu = mw.menuBar().addMenu('Fetch');

  fetch_menu.addAction(_QAction('Fetch Guilds', async () => {
    await client.guilds.fetchAll();

    /** @type {QTreeWidget} */
    const tree = tabw.widget(2);
    tree.clear();
    populateTreeWidgetWithMapEntries(tree, client.guilds.cache);
  }));

  fetch_menu.addAction(_QAction('Fetch DMs', async () => {
    await client.channels.fetchDMs();

    /** @type {QTreeWidget} */
    const tree = tabw.widget(2);
    tree.clear();
    populateTreeWidgetWithMapEntries(tree, client.channels.cache);
  }));

  fetch_menu.addAction(_QAction('Fetch Friends', async () => {
    await client.users.fetchFriends();
    //console.log(client.users.cache);

    /** @type {QTreeWidget} */
    const tree = tabw.widget(2);
    tree.clear();
    populateTreeWidgetWithMapEntries(tree, client.users.cache);
  }));

  // add tabs to window
  for(const s of ['Guilds', 'Channels', 'Users'])
    tabw.addTab(createTab(client, s.toLowerCase()), no_icon, s);
  tabw.addTab(createMeTab(client, tabw), no_icon, 'Me');

  mw.show();
  return mw;
};