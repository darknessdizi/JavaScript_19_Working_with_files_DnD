export default class EditController {
  constructor(editor) {
    this.edit = editor;
    this.currentColum = null;
    this.currentCard = null;
    this.actualCard = null;
    this.cell = null;
    this.shadow = null;
    this.statusInvite = null;
    this.state = {
      tasks: { title: 'Задачи', data: [] },
      process: { title: 'В процессе', data: [] },
      completed: { title: 'Выполнены', data: [] },
    };
    this.coordinateDeviation = {
      x: null,
      y: null,
    };

    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
  }

  init() {
    // Инициализация проекта
    if (localStorage.getItem('trelloData')) {
      this.state = JSON.parse(localStorage.getItem('trelloData'));
    }
    this.edit.bindToDOM(this.state);

    this.edit.addButtonAddListeners(this.onClickButtonAdd.bind(this));
    this.edit.addButtonAddNewCardListeners(this.onClickButtonAddNewCard.bind(this));
    this.edit.addCrossListeners(this.onClickCross.bind(this));
    this.edit.addOverColumnListeners(this.onMouseOverColumn.bind(this));
    this.edit.addOutColumnListeners(this.onMouseOutColumn.bind(this));
    this.edit.addTaskCrossListeners(this.onClickTaskCross.bind(this));
    this.edit.addMouseDownListeners(this.mouseDownListeners.bind(this));
  }

  onClickButtonAdd(event) {
    // Callback - создание формы для новой задачи
    const listConteiner = document.querySelectorAll('.conteiner-button');
    listConteiner.forEach((el) => el.classList.remove('noactive'));

    const parent = event.target.closest('.conteiner-button');
    parent.classList.add('noactive');
    this.currentColum = parent.closest('.column');
    if (this.edit.form) {
      this.edit.form.remove();
    }
    this.edit.drawFormNewCard(this.currentColum);
  }

  onClickButtonAddNewCard() {
    // Callback - добавление новой задачи в колонку
    const { value } = this.edit.form.querySelector('.new-card-textarea');
    const key = this.currentColum.id;
    this.saveDataLocalStorage(key, value);

    this.edit.drawNewCard(key, value);
  }

  onClickCross() {
    // Callback - отмена ввода данных в форме заполнения новой задачи
    this.edit.form.remove();
    const divBtn = this.currentColum.querySelector('.conteiner-button');
    divBtn.classList.remove('noactive');
  }

  onMouseOverColumn(event) {
    // Callback - вхождение курсора мыши в поле задачи
    if (this.currentCard) return;
    if (event.target.classList.value === 'card') {
      this.currentCard = event.target;
      this.edit.constructor.addElementCross(event.target);
    }
  }

  onMouseOutColumn(event) {
    // Callback - выход курсора мыши из поля задачи
    if (!this.currentCard) return;
    let { relatedTarget } = event;
    while (relatedTarget) {
      // поднимаемся по дереву элементов и проверяем – внутри ли мы this.currentCard или нет
      // если да, то это переход внутри элемента – игнорируем
      if (relatedTarget === this.currentCard) return;
      relatedTarget = relatedTarget.parentNode;
    }
    this.currentCard = null;
    this.edit.constructor.deleteElementCross(event.target);
  }

  onClickTaskCross(event) {
    // Callback - удаление задачи из колонки
    if (event.target.classList.value === 'card-cross') {
      const card = event.target.closest('.card');
      const key = event.target.closest('.column').id;
      this.deleteDataLocalStorage(card, key);
      card.remove();
      this.currentCard = null;
    }
  }

  mouseDownListeners(event) {
    // Callback - удержание клика на элементе
    event.preventDefault();
    if (event.target.classList.value === 'card') {
      const body = document.querySelector('body');
      body.classList.add('grabbing');

      this.actualCard = event.target;

      this.coordinateDeviation.x = event.clientX - event.target.offsetLeft;
      this.coordinateDeviation.y = event.clientY - event.target.offsetTop;

      const top = event.clientY - this.coordinateDeviation.y;
      const left = event.clientX - this.coordinateDeviation.x;
      this.actualCard.style.top = `${top}px`;
      this.actualCard.style.left = `${left}px`;

      this.actualCard.style.width = `${event.target.offsetWidth}px`;

      this.shadow = document.createElement('div');
      this.shadow.classList.add('card-shadow');
      this.shadow.style.height = `${this.actualCard.offsetHeight}px`;
      this.shadow.style.width = `${this.actualCard.offsetWidth}px`;
      this.actualCard.after(this.shadow);

      this.actualCard.classList.add('transfer');

      this.cell = this.actualCard;

      document.documentElement.addEventListener('mouseup', this.mouseUp);
      document.documentElement.addEventListener('mousemove', this.mouseMove);
      document.documentElement.addEventListener('mouseover', this.mouseOver);
    }
  }

  mouseUp(event) {
    // Отпустили кнопку мыши после длительного нажатия
    const body = document.querySelector('body');
    body.classList.remove('grabbing');
    document.documentElement.removeEventListener('mouseup', this.mouseUp);
    document.documentElement.removeEventListener('mousemove', this.mouseMove);
    document.documentElement.removeEventListener('mouseover', this.mouseOver);
    if (this.cell) {
      const keyOld = this.actualCard.closest('.column').id;
      const key = event.target.closest('.column').id;
      let count = null;
      if (this.statusInvite === true) {
        this.cell.before(this.actualCard);
        count = 0;
      } else {
        this.cell.after(this.actualCard);
        count = 1;
      }
      this.changeDataLocalStorage(key, keyOld, count);
      this.cell = null;
      this.statusInvite = null;
      this.shadow.remove();
    }
    this.actualCard.removeAttribute('style');
    this.actualCard.classList.remove('transfer');
    this.actualCard = null;
  }

  mouseMove(event) {
    // Отслеживает движение курсора при нажатом клике мыши
    const top = event.clientY - this.coordinateDeviation.y;
    const left = event.clientX - this.coordinateDeviation.x;
    this.actualCard.style.top = `${top}px`;
    this.actualCard.style.left = `${left}px`;
    if (this.cell) {
      const center = this.cell.offsetTop + (this.cell.offsetHeight / 2);
      if (center > event.clientY) {
        this.statusInvite = true;
        this.cell.before(this.shadow);
      } else {
        this.statusInvite = false;
        this.cell.after(this.shadow);
      }
    } else {
      this.shadow.remove();
    }
  }

  mouseOver(event) {
    // Метод определяет цель над которой находится курсор при нажатом клике
    const column = event.target.closest('.column');
    if (column) {
      if (column.children.length === 2) {
        column.firstChild.after(this.shadow);
        this.cell = this.shadow;
        return;
      }
      const element = event.target.closest('.card');
      if (element) {
        this.cell = element;
      }
      return;
    }
    this.cell = null;
    if (event.target.classList.value === 'content-task') {
      this.mouseUp(event);
    }
  }

  saveDataLocalStorage(key, value, name = null) {
    // Добавление данных в localStorage
    if (key in this.state) {
      this.state[key].data.push(value);
    } else {
      this.state[key] = { title: name, data: [] };
      this.state[key].data.push(value);
    }
    localStorage.setItem('trelloData', JSON.stringify(this.state));
  }

  deleteDataLocalStorage(card, key) {
    // Удаление данных из localStorage
    const array = this.state[key].data;
    const index = array.indexOf(card.textContent);
    this.state[key].data.splice(index, 1);
    localStorage.setItem('trelloData', JSON.stringify(this.state));
  }

  changeDataLocalStorage(key, keyOld, step) {
    // Внесение изменений в localStorage
    let array = this.state[keyOld].data;
    let index = array.indexOf(this.actualCard.textContent);
    this.state[keyOld].data.splice(index, 1);

    array = this.state[key].data;
    index = array.indexOf(this.cell.textContent) + step;
    this.state[key].data.splice(index, 0, this.actualCard.textContent);

    localStorage.setItem('trelloData', JSON.stringify(this.state));
  }
}
