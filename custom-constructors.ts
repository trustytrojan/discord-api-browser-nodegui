import {
  QTreeWidgetItem,
  EchoMode,
  QLineEdit,
  AlignmentFlag,
  QLabel,
  QPushButton,
  QAction
} from '@nodegui/nodegui';

export function _QAction(text: string, onclick: () => void): QAction {
  const action = new QAction();
  action.setText(text);
  action.addEventListener('triggered', onclick);
  return action;
}

export function _QTreeWidgetItem(columns: string[]): QTreeWidgetItem {
  const item = new QTreeWidgetItem();
  for(let i = 0; i < columns.length; ++i)
    item.setText(i, columns[i]);
  return item;
}

export function _QLineEdit(echo_mode?: EchoMode): QLineEdit {
  const le = new QLineEdit();
  if(echo_mode) le.setEchoMode(echo_mode);
  return le;
}

export function _QLabel(text: string, alignment?: AlignmentFlag): QLabel {
  const label = new QLabel();
  label.setText(text);
  label.setAlignment(alignment ?? AlignmentFlag.AlignCenter);
  return label;
}

export function _QPushButton(text: string, onclick: () => void): QPushButton {
  const button = new QPushButton();
  button.setText(text);
  button.addEventListener('clicked', onclick);
  return button;
}