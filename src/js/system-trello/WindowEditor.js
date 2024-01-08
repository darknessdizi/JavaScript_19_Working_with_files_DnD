export default class WindowEditor {
  constructor(parent) {
    this.parent = parent;
    this.conteiner = null;
    this.buttonAddListeners = [];
  }

  bindToDOM() {
    this.createMain();
  }

  createMain() {
    this.conteiner = WindowEditor.addBlockDivHTML(this.parent, 'content');
    const mainBlock = WindowEditor.addBlockDivHTML(this.conteiner, 'conteiner');
    let btn = WindowEditor.addColumn(mainBlock, 'Задачи');
    btn.addEventListener('click', (event) => this.onClickButtonAdd(event));

    btn = WindowEditor.addColumn(mainBlock, 'В процессе');
    btn.addEventListener('click', (event) => this.onClickButtonAdd(event));

    btn = WindowEditor.addColumn(mainBlock, 'Выполнены');
    btn.addEventListener('click', (event) => this.onClickButtonAdd(event));
  }

  static addBlockDivHTML(parent, className = null) {
    const div = document.createElement('div');
    div.classList.add(className);
    parent.append(div);
    return div;
  }

  static addColumn(mainBlock, title) {
    const divColumn = WindowEditor.addBlockDivHTML(mainBlock, 'column');
    const blockName = document.createElement('h3');
    blockName.textContent = title;
    divColumn.append(blockName);

    const divButton = WindowEditor.addBlockDivHTML(divColumn, 'conteiner-button');
    const span = document.createElement('span');
    span.textContent = '+';
    divButton.append(span);
    const btn = document.createElement('button');
    btn.textContent = 'Add another card';
    btn.type = 'button';
    btn.classList.add('btn-add-card');
    divButton.append(btn);
    return btn;
  }

  onClickButtonAdd(event) {
    event.preventDefault();
    this.buttonAddListeners.forEach((o) => o.call(null, event));
  }

  addButtonAddListeners(callback) {
    this.buttonAddListeners.push(callback);
  }

  drawInputField(column) {
    const divConteiner = WindowEditor.addBlockDivHTML(column, 'conteiner-new-card');
    const textarea = document.createElement('textarea');
    textarea.classList.add('new-card-textarea');
    textarea.setAttribute('rows', '5');
    textarea.setAttribute('placeholder', 'Enter a title for this card...');
    divConteiner.append(textarea);
    textarea.focus();
    const btn = document.createElement('button');
    btn.textContent = 'Add Card';
    btn.type = 'button';
    btn.classList.add('new-card-button');
    divConteiner.append(btn);
  }
}
