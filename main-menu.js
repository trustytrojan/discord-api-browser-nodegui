const Client = require('./classes/Client');
const style_sheet = require('./style-sheet');
const { AlignmentFlag, TabPosition, QIcon } = require('@nodegui/nodegui');
const { _QLabel, _QTreeWidgetItem, _QTreeWidget, _QPushButton, _QTabWidget, _QMainWindow } = require('./utils');

/**
 * For guilds,channels,users
 * @param {Client} client 
 * @param {string} elementType
 */
function generateTab(client, elementType) {
  if(client[elementType].cache.size === 0) {
    const without_the_s = elementType.substring(0, elementType.length-1);
    return _QLabel({ text: `${without_the_s} cache is empty`, alignment: AlignmentFlag.AlignCenter });
  }
  const tree = _QTreeWidget({ column_count: 2 });
  for(const { id, name } of client[elementType].cache.values())
    tree.addTopLevelItem(_QTreeWidgetItem({ columns: [id, name] }));
  return tree;
}

/**
 * @param {Client} client 
 */
function clientUserTab(client) {
  if(!client.user) {
    const label = _QLabel({ text: 'no user login', alignment: AlignmentFlag.AlignCenter });
    //const login_btn = _QPushButton({ text: 'login' });
    return label;
  }
  const tree = _QTreeWidget({ column_count: 2 });
  for(const k in client.user)
    tree.addTopLevelItem(_QTreeWidgetItem({ columns: [k, client.user[k]] }));
  return tree;
}

/**
 * @param {Client} client 
 */
function showMainMenu(client) {
  const tabs = _QTabWidget({ tab_position: TabPosition.West });
  for(const s of ['Guilds', 'Channels', 'Users'])
    tabs.addTab(generateTab(client, s.toLowerCase()), new QIcon(), s);
  tabs.addTab(clientUserTab(client), new QIcon(), 'Me');
  _QMainWindow({
    show: true,
    central_widget: tabs,
    dimensions: { min: [500,300] },
    style_sheet
  });
}

module.exports = showMainMenu;