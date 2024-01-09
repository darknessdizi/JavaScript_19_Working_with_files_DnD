export default class WindowEditor {
  constructor(parent) {
    this.parent = parent;
    this.conteiner = null;
    this.form = null;
    // this.btnNewCard = null;
    this.buttonAddListeners = [];
    this.buttonAddNewCardListeners = [];
  }

  bindToDOM() {
    // Создает и добавляет блок main в body
    this.conteiner = WindowEditor.addTagHTML(this.parent, 'content', 'main');
    const mainBlock = WindowEditor.addTagHTML(this.conteiner, 'conteiner');
    let btn = WindowEditor.addColumn(mainBlock, 'Задачи');
    btn.addEventListener('click', (event) => this.onClickButtonAdd(event));

    btn = WindowEditor.addColumn(mainBlock, 'В процессе');
    btn.addEventListener('click', (event) => this.onClickButtonAdd(event));

    btn = WindowEditor.addColumn(mainBlock, 'Выполнены');
    btn.addEventListener('click', (event) => this.onClickButtonAdd(event));
  }

  static addTagHTML(parent, className = null, type = 'div') {
    // Создает заданный тег и добавляет его в parent
    const div = document.createElement(type);
    div.classList.add(className);
    parent.append(div);
    return div;
  }

  static addColumn(mainBlock, title) {
    // Создает колонку и добавляет его на главную странцу
    const divColumn = WindowEditor.addTagHTML(mainBlock, 'column');
    const columnTitle = WindowEditor.addTagHTML(divColumn, 'column-title', 'h3');
    columnTitle.textContent = title;

    const divButton = WindowEditor.addTagHTML(divColumn, 'conteiner-button');
    const span = document.createElement('span');
    span.textContent = '+';
    divButton.append(span);
    const btn = WindowEditor.addTagHTML(divButton, 'btn-add-card', 'button');
    btn.textContent = 'Add another card';
    btn.type = 'button';
    return btn;
  }

  onClickButtonAdd(event) {
    // Запускает обработчик для кнопки "Add another card"
    event.preventDefault();
    this.buttonAddListeners.forEach((o) => o.call(null, event));
  }

  addButtonAddListeners(callback) {
    // Сохраняет callback для кнопки "Add another card"
    this.buttonAddListeners.push(callback);
  }

  drawFormNewCard(column) {
    // Отрисовывает форму добавления новой задачи
    this.form = WindowEditor.addTagHTML(column, 'conteiner-new-card', 'form');
    this.form.setAttribute('name', 'card');
    this.form.setAttribute('id', 'new-card');

    const textarea = document.createElement('textarea');
    textarea.classList.add('new-card-textarea');
    textarea.setAttribute('rows', '5');
    textarea.setAttribute('placeholder', 'Enter a title for this card...');
    textarea.setAttribute('required', '');
    this.form.append(textarea);
    textarea.focus();

    const divControl = WindowEditor.addTagHTML(this.form, 'new-card-control');
    const btnNewCard = document.createElement('button');
    btnNewCard.textContent = 'Add Card';
    btnNewCard.type = 'submit';
    btnNewCard.classList.add('control-button-add');
    btnNewCard.setAttribute('form', 'new-card');
    divControl.append(btnNewCard);
    const cross = WindowEditor.addTagHTML(divControl, 'control-cross');
    btnNewCard.addEventListener('click', (event) => this.onClickButtonNewCard(event), { once: true });
  }

  onClickButtonNewCard(event) {
    // Запускает обработчик для кнопки "Add card" при добавлении новой задачи
    // event.preventDefault();
    // if (event.t) {

    // }
    console.log(event)
    this.buttonAddNewCardListeners.forEach((o) => o.call(null, event));
  }

  addButtonAddNewCardListeners(callback) {
    // Сохраняет callback для кнопки "Add card" при добавлении новой задачи
    this.buttonAddNewCardListeners.push(callback);
  }

  drawNewCard(parent, value) {
    this.form.remove();
    const btn = parent.querySelector('.conteiner-button');
    btn.classList.remove('noactive');

    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = value;
    btn.before(card);
  }
}
