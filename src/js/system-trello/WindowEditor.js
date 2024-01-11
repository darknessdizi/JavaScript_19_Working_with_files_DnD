export default class WindowEditor {
  constructor(parent) {
    this.parent = parent;
    this.conteiner = null;
    this.form = null;
    this.buttonAddListeners = [];
    this.buttonAddNewCardListeners = [];
    this.crossListeners = [];
    this.mouseOverListeners = [];
    this.mouseOutListeners = [];
    this.taskListeners = [];
    this.mouseDownListeners = [];
  }

  bindToDOM(object) {
    // Создает и добавляет блок main в body
    this.conteiner = WindowEditor.addTagHTML(this.parent, 'content', 'main');
    const mainBlock = WindowEditor.addTagHTML(this.conteiner, 'conteiner');
    for (const params of Object.entries(object)) {
      const [slug, obj] = params;
      this.addColumn(mainBlock, obj.title, slug);
      for (const task of obj.data) {
        this.drawNewCard(slug, task);
      }
    }

    // this.parent.addEventListener('mousemove', this.onMouseMove);
    // mainBlock.addEventListener('mouseup', (event) => this.onMouseUpTask(event));
  }

  // onMouseMove(event) {
  //   console.log(event.clientX + '-x:y-' + event.clientY);
  // }

  static addTagHTML(parent, className = null, type = 'div') {
    // Создает заданный тег и добавляет его в parent
    const div = document.createElement(type);
    div.classList.add(className);
    parent.append(div);
    return div;
  }

  addColumn(mainBlock, title, slug) {
    // Создает колонку и добавляет его на главную странцу
    const divColumn = WindowEditor.addTagHTML(mainBlock, 'column');
    divColumn.setAttribute('id', slug);
    const columnTitle = WindowEditor.addTagHTML(divColumn, 'column-title', 'h3');
    columnTitle.textContent = title;

    const divButton = WindowEditor.addTagHTML(divColumn, 'conteiner-button');
    const span = document.createElement('span');
    span.textContent = '+';
    divButton.append(span);
    const btn = WindowEditor.addTagHTML(divButton, 'btn-add-card', 'button');
    btn.textContent = 'Add another card';
    btn.type = 'button';

    divColumn.addEventListener('mouseover', (event) => this.onMouseOverColumn(event));
    divColumn.addEventListener('mouseout', (event) => this.onMouseOutColumn(event));
    divColumn.addEventListener('click', (event) => this.onClickTaskCross(event));
    divColumn.addEventListener('mousedown', (event) => this.onMouseDownTask(event));
    btn.addEventListener('click', (event) => this.onClickButtonAdd(event));
  }

  drawFormNewCard(column) {
    // Отрисовывает форму добавления новой задачи
    this.form = WindowEditor.addTagHTML(column, 'conteiner-new-card', 'form');
    this.form.setAttribute('name', 'card');
    this.form.setAttribute('id', 'new-card');
    this.form.setAttribute('novalidate', '');

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
    this.form.addEventListener('submit', (event) => this.onClickButtonNewCard(event));
    cross.addEventListener('click', (event) => this.onClickCross(event));
  }

  drawNewCard(slug, value) {
    // Отрисовывает карточку задачи в колонку
    if (this.form) {
      this.form.remove();
    }
    const parent = this.conteiner.querySelector(`#${slug}`);
    const btn = parent.querySelector('.conteiner-button');
    btn.classList.remove('noactive');

    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = value;
    btn.before(card);
  }

  addElementCross(parent) {
    // Добавляет поле с крестиком для зыкрытия задачи
    const cross = WindowEditor.addTagHTML(parent, 'card-cross');
  }

  deleteElementCross(element) {
    // Удаляет элемент крестика у карточки
    const cross = element.querySelector('.card-cross') || element;
    cross.remove();
  }

  onClickButtonNewCard(event) {
    // Запускает обработчик для кнопки "Add card" при добавлении новой задачи
    event.preventDefault();
    if (this.form.checkValidity()) {
      console.log('valid');
      this.buttonAddNewCardListeners.forEach((o) => o.call(null));
    } else {
      console.log('invalid');
    }
  }

  addButtonAddNewCardListeners(callback) {
    // Сохраняет callback для кнопки "Add card" при добавлении новой задачи
    this.buttonAddNewCardListeners.push(callback);
  }

  onClickCross() {
    this.crossListeners.forEach((o) => o.call(null));
  }

  addCrossListeners(callback) {
    // Сохраняет callback для блока с крестиком при добавлении новой задачи
    this.crossListeners.push(callback);
  }

  onClickButtonAdd(event) {
    // Запускает обработчик для кнопки "Add another card" (запуск формы новой задачи)
    event.preventDefault();
    this.buttonAddListeners.forEach((o) => o.call(null, event));
  }

  addButtonAddListeners(callback) {
    // Сохраняет callback для кнопки "Add another card"
    this.buttonAddListeners.push(callback);
  }

  onMouseOverColumn(event) {
    this.mouseOverListeners.forEach((o) => o.call(null, event));
  }

  addOverColumnListeners(callback) {
    // Сохраняет callback для кнопки "Add another card"
    this.mouseOverListeners.push(callback);
  }

  onMouseOutColumn(event) {
    this.mouseOutListeners.forEach((o) => o.call(null, event));
  }

  addOutColumnListeners(callback) {
    // Сохраняет callback для кнопки "Add another card"
    this.mouseOutListeners.push(callback);
  }

  onClickTaskCross(event) {
    this.taskListeners.forEach((o) => o.call(null, event));
  }

  addTaskCrossListeners(callback) {
    // Сохраняет callback для закрытия поля задачи
    this.taskListeners.push(callback);
  }

  onMouseDownTask(event) {
    this.mouseDownListeners.forEach((o) => o.call(null, event));
  }

  addMouseDownListeners(callback) {
    // Сохраняет callback (кнопка мыши нажата над элементом)
    this.mouseDownListeners.push(callback);
  }
}
