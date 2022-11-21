const { QMainWindow, QLineEdit, QPushButton, QLabel, EchoMode, Direction, QDialog, QErrorMessage } = require('@nodegui/nodegui');
const { _q, _QGridLayout, _setLayout, _QBoxLayout } = require('./utils');
const { writeFileSync } = require('fs');
const Client = require('./classes/Client');
const style_sheet = require('./style-sheet');

function badTokenDialog() {
  const dialog = new QErrorMessage();
  //dialog.setWindowTitle('Invalid token!');
  dialog.setStyleSheet(style_sheet);
  dialog.exec();
}

/**
 * @param {string} token the token we just got from the user
 */
function saveTokenDialog(token) {
  const yes_btn = _q(QPushButton, { text: 'Yes' });
  yes_btn.addEventListener('clicked', () => {
    writeFileSync('token.json', `"${token}"`);
    dialog.close();
  });
  const no_btn = _q(QPushButton, { text: 'No' });
  no_btn.addEventListener('clicked', () => {
    dialog.close();
  })
  const layout = _QGridLayout([
    [_q(QLabel, { text: 'Would you like to save your token?' })],
    [no_btn, yes_btn]
  ]);
  const dialog = new QDialog();
  dialog.setStyleSheet(style_sheet);
  dialog.setLayout(layout);
  dialog.setWindowTitle('Save Token');
  dialog.exec();
}

/**
 * Gets token from user, injects it into client
 * @param {Client} client 
 * @returns {Promise<void>}
 */
const showLoginForm = (client) => new Promise((resolve, reject) => {
  const token_l = _q(QLabel, { text: 'Enter Discord token:' });
  const token_le = _q(QLineEdit, { echo_mode: EchoMode.Password });
  
  const login_btn = _QPushButton({ text: 'Login', onclick: async () => {
    const token = token_le.text();
    await client.login(token);
    if(client.user) {
      saveTokenDialog(token);
      resolve();
    } else badTokenDialog();
  } });

  const cancel_btn = _q(QPushButton, { text: 'Cancel' });
  cancel_btn.addEventListener('clicked', () => {
    reject();
  });

  const btns = _QBoxLayout(Direction.RightToLeft, [login_btn, cancel_btn]);
  
  const layout = _QGridLayout([
    [token_l, token_le],
    [null, btns],
  ]);
  
  const main_window = new QMainWindow();
  _setLayout(main_window, layout);
  main_window.setStyleSheet(style_sheet);
  main_window.show();
});

module.exports = showLoginForm;