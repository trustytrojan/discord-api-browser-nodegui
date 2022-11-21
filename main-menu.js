const { QMainWindow, QTabWidget, QTreeWidget, QTreeWidgetItem, QIcon, TabPosition } = require('@nodegui/nodegui');
const Client = require('./classes/Client');
const style_sheet = require('./style-sheet');
const { quick_construct } = require('./utils');

/**
 * @param {Client} client 
 * @param {string} elementType
 */
function generateTab(client, elementType) {
  const without_the_s = elementType.substring(0, elementType.length-1);
  const tree = new QTreeWidget();
  tree.setColumnCount(2);
  if(client[elementType].cache.size === 0) {
    tree.addTopLevelItem(quick_construct(QTreeWidgetItem, { columns: ['', `<${without_the_s} cache is empty>`] }));
  } else {
    for(const { id, name } of client[elementType].cache.values())
      tree.addTopLevelItem(quick_construct(QTreeWidgetItem, { columns: [id, name] }));
  }
  return tree;
}

function clientUserTab(client) {
  
}

/**
 * @param {Client} client 
 */
function showMainMenu(client) {
  const tabs = new QTabWidget();
  tabs.setTabPosition(TabPosition.West);
  for(const s of ['Guilds', 'Channels', 'Users'])
    tabs.addTab(generateTab(client, s.toLowerCase()), new QIcon(), s);
  tabs.addTab(clientUserTab(client), new QIcon(), 'Me');
  const main_window = new QMainWindow();
  main_window.setCentralWidget(tabs);
  main_window.setStyleSheet(style_sheet);
  main_window.show();
}

module.exports = showMainMenu;