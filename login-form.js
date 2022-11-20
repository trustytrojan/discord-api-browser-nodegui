const { QMainWindow, QLineEdit, QPushButton, QLabel, EchoMode, Direction, QDialog } = require('@nodegui/nodegui');
const { quick_construct, _QGridLayout, _setLayout, _QBoxLayout } = require('./utils');
const { writeFileSync } = require('fs');

const widget_color = '#484848';
const text_color = `'white'`;
const style_sheet = `
  QMainWindow {
    background-color: #333333
  }
  QDialog {
    background-color: #333333
  }
  QLineEdit {
    background-color: ${widget_color};
    color: ${text_color};
  }
  QLabel {
    color: ${text_color}
  }
  QPushButton {
    background-color: ${widget_color};
    color: ${text_color}
  }
`;

/**
 * 
 * @param {Client} client 
 */
function showLoginForm(client) {  
  const token_l = quick_construct(QLabel, { text: 'Enter Discord token:' });
  const token_le = quick_construct(QLineEdit, { echo_mode: EchoMode.Password });
  
  const login_btn = quick_construct(QPushButton, { text: 'Login' });
  login_btn.addEventListener('clicked', () => {
    const token = token_le.text();

    const yes_btn = quick_construct(QPushButton, { text: 'Yes' });
    yes_btn.addEventListener('clicked', () => {
      writeFileSync('token.json', `"${token}"`);
      dialog.close();
    });
    const no_btn = quick_construct(QPushButton, { text: 'No' });
    no_btn.addEventListener('clicked', () => {
      dialog.close();
    })
    const layout = _QGridLayout([
      [quick_construct(QLabel, { text: 'Would you like to save your token?' })],
      [no_btn, yes_btn]
    ]);
    const dialog = new QDialog();
    dialog.setStyleSheet(style_sheet);
    dialog.setLayout(layout);
    dialog.setWindowTitle('Save Token');
    dialog.exec();
    main_window.close();
  });

  const cancel_btn = quick_construct(QPushButton, { text: 'Cancel' });
  cancel_btn.addEventListener('clicked', process.exit);

  const btns = _QBoxLayout(Direction.RightToLeft, [login_btn, cancel_btn]);
  
  const layout = _QGridLayout([
    [token_l, token_le],
    [null, btns]
  ]);
  
  const main_window = new QMainWindow();
  _setLayout(main_window, layout);
  main_window.setStyleSheet(style_sheet);
  main_window.show();
}

module.exports = showLoginForm;