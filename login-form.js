const { EchoMode, Direction, QErrorMessage } = require('@nodegui/nodegui');
const { writeFileSync } = require('fs');
const Client = require('./classes/Client');
const { _QPushButton, _QGridLayout, _QLabel, _QLineEdit, _QBoxLayout, _QDialog } = require('./custom-constructors');
const style_sheet = require('./style-sheet');

function badTokenDialog() {
  const dialog = new QErrorMessage();
  dialog.setWindowTitle('Invalid token!');
  dialog.setStyleSheet(style_sheet);
  dialog.exec();
}

/**
 * @param {string} token the token we just got from the user
 */
function saveTokenDialog(token) {
  const yes_btn = _QPushButton('Yes', () => {
    writeFileSync('token.json', `"${token}"`);
    dialog.close();
  });
  const no_btn = _QPushButton('No', () => dialog.close());
  const layout = _QGridLayout([
    [{ object: _QLabel('Would you like to save your token?'), rowSpan: 2 }],
    [no_btn, yes_btn]
  ]);
  const dialog = _QDialog('Save Token', layout, style_sheet);
  dialog.exec();
}

/**
 * Gets token from user, injects it into client
 * @param {Client} client 
 * @returns {Promise<void>}
 */
function showLoginForm(client) {
  const token_l = _QLabel('Enter Discord token:');
  const token_le = _QLineEdit(EchoMode.Password);
  
  const login_btn = _QPushButton('Login', async () => {
    const token = token_le.text();
    await client.login(token);
    if(client.user) {
      saveTokenDialog(token);
      dialog.close();
    } else badTokenDialog();
  });

  const cancel_btn = _QPushButton('Cancel', () => dialog.close());

  const btns = _QBoxLayout(Direction.RightToLeft, [login_btn, cancel_btn]);
  
  const layout = _QGridLayout([
    [token_l, token_le],
    [null, btns],
  ]);
  
  const dialog = _QDialog('Login', layout, style_sheet);
  dialog.exec();
}

module.exports = showLoginForm;