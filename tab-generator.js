const Client = require('./classes/Client');
const { Direction, QTreeWidget, QTabWidget, QIcon } = require('@nodegui/nodegui');
const { _QLabel, _QPushButton, _QBoxLayout, _QTreeWidgetItem } = require('./custom-constructors');
const { wrapLayoutWithWidget } = require('./utils');

const no_icon = new QIcon();

/**
 * For guilds, channels, and users tabs
 * @param {QTreeWidget} tree 
 * @param {Map<string,any>} data 
 */
function populateTreeWidgetWithMapEntries(tree, data) {
  for(const [k, { name, tag }] of data)
    tree.addTopLevelItem(_QTreeWidgetItem([k, name ?? tag]));
}

/**
 * For any object
 * @param {QTreeWidget} tree 
 * @param {object} object 
 * @param {boolean} excludeUndefined 
 */
function populateTreeWidgetWithObjectProperties(tree, object, excludeUndefined = true) {
  for(const k in object) {
    if(excludeUndefined && object[k] === undefined) continue;
    tree.addTopLevelItem(_QTreeWidgetItem([k, String(object[k])]));
  }
}

/**
 * For guilds,channels,users
 * @param {Client} client
 * @param {'guilds' | 'channels' | 'users'} elementType
 */
function createTab(client, elementType) {
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
  populateTreeWidgetWithMapEntries(tree, data);
  return tree;
}

/**
 * @param {Client} client 
 * @param {QTabWidget} tabw 
 * @returns 
 */
function createMeTab(client, tabw) {
  if(!client.user) {
    const label = _QLabel('no user login');
    const login_btn = _QPushButton('login', () => {
      require('./login-form')(client);
      // once login is complete, update the Me tab
      tabw.removeTab(3);
      tabw.insertTab(3, createMeTab(), no_icon, 'Me');
    });
    const layout = new _QBoxLayout(Direction.TopToBottom, [label, login_btn]);
    return wrapLayoutWithWidget(layout);
  }
  const tree = new QTreeWidget();
  tree.setColumnCount(2);
  tree.setHeaderLabels(['key', 'value']);
  populateTreeWidgetWithObjectProperties(tree, client.user);
  return tree;
}

module.exports = {
  get createMeTab() { return createMeTab; },
  get createTab() { return createTab; },
  get populateTreeWidgetWithMapEntries() { return populateTreeWidgetWithMapEntries; },
  get populateTreeWidgetWithObjectProperties() { return populateTreeWidgetWithObjectProperties; }
};