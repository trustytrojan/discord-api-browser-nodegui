const widget = '#484848';
const background = '#333333';
const text = `#ffffff`;

const style_sheet = `
  QWidget {
    background-color: ${background};
    color: ${text}
  }
  QLineEdit {
    background-color: ${widget};
    color: ${text};
  }
  QLabel {
    color: ${text}
  }
  QPushButton {
    background-color: ${widget};
    color: ${text}
  }
`;

module.exports = style_sheet;