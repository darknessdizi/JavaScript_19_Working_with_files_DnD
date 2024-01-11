import { createButton } from '../welcomePage';

export default class EditController {
  constructor(editor) {
    this.edit = editor;
    this.currentColum = null;
    this.currentCard = null;
    this.actualCard = null;
    this.state = {
      'tasks': { title: 'Задачи', data: [] },
      'process': { title: 'В процессе', data: [] },
      'completed': { title: 'Выполнены', data: [] },
    };
    this.coordinateDeviation = {
      x: null,
      y: null,
    };
  }

  init() {
    // Инициализация проекта
    if (localStorage.getItem('trelloData')) {
      this.state = JSON.parse(localStorage.getItem('trelloData'));
    }
    this.edit.bindToDOM(this.state);
    createButton(this.edit.conteiner);

    this.edit.addButtonAddListeners(this.onClickButtonAdd.bind(this));
    this.edit.addButtonAddNewCardListeners(this.onClickButtonAddNewCard.bind(this));
    this.edit.addCrossListeners(this.onClickCross.bind(this));
    this.edit.addOverColumnListeners(this.onMouseOverColumn.bind(this));
    this.edit.addOutColumnListeners(this.onMouseOutColumn.bind(this));
    this.edit.addTaskCrossListeners(this.onClickTaskCross.bind(this));
    this.edit.addMouseDownListeners(this.mouseDownListeners.bind(this));
    this.edit.addMouseUpListeners(this.mouseUpListeners.bind(this))

    document.documentElement.addEventListener('mouseup', this.mouseUpListeners.bind(this));
    document.documentElement.addEventListener('mousemove', this.mouseMove.bind(this));
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
    const value = this.edit.form.querySelector('.new-card-textarea').value;
    const key = this.currentColum.id;
    this.saveDataObject(key, value);

    this.edit.drawNewCard(key, value);
  }

  saveDataObject(key, value) {
    // Сохранение данных в localStorage
    if (key in this.state) {
      this.state[key].data.push(value);
    } else {
      this.state[key].data = [value];
    }
    localStorage.setItem('trelloData', JSON.stringify(this.state));
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
      this.edit.addElementCross(event.target);
    }
  }

  onMouseOutColumn(event) {
    // Callback - выход курсора мыши из поля задачи
    if (!this.currentCard) return;
    let relatedTarget = event.relatedTarget;
    while (relatedTarget) {
      // поднимаемся по дереву элементов и проверяем – внутри ли мы this.currentCard или нет
      // если да, то это переход внутри элемента – игнорируем
      if (relatedTarget == this.currentCard) return;
      relatedTarget = relatedTarget.parentNode;
    }
    this.currentCard = null;
    this.edit.deleteElementCross(event.target);
  }

  onClickTaskCross(event) {
    // Callback - удаление задачи из колонки
    if (event.target.classList.value === 'card-cross') {
      const card = event.target.closest('.card');
      const key = event.target.closest('.column').id;
      const array = this.state[key].data;
      const index = array.indexOf(card.textContent);
      this.state[key].data.splice(index, 1);
      card.remove();
      this.currentCard = null;
      localStorage.setItem('trelloData', JSON.stringify(this.state));
    }
  }

  mouseDownListeners(event) {
    // Удержание мышки на элементе
    event.preventDefault();
    if (event.target.classList.value === 'card') {
      // console.log('удержана', 'event.target.offsetTop=', event.target.offsetTop, 'event.target.offsetLeft=', event.target.offsetLeft);
      // console.log('удержана', event, 'y=', event.clientY - this.coordinateDeviation.y, 'x=', event.clientX - this.coordinateDeviation.x);

      this.actualCard = event.target;

      this.coordinateDeviation.x = event.clientX - event.target.offsetLeft;
      this.coordinateDeviation.y = event.clientY - event.target.offsetTop;

      this.actualCard.style.top = event.clientY - this.coordinateDeviation.y + 'px';
      this.actualCard.style.left = event.clientX - this.coordinateDeviation.x + 'px';
      // console.log('left', event.target.offsetLeft, 'top', event.target.offsetTop)

      this.actualCard.style.width = event.target.offsetWidth + 'px';
      this.actualCard.classList.add('transfer');
    }
  }

  mouseUpListeners(event) {
    // Отпустили кнопку мыши на элементе
    event.preventDefault();
    // console.log('отпущена', event.target);
    // console.log('this.actualCard', this.actualCard);
    if (this.actualCard) {
      this.actualCard.removeAttribute('style');
      this.actualCard.classList.remove('transfer');
      this.actualCard = null;
    }
    
  }

  mouseMove(event) {
    // Движение курсора мыши
    if (this.actualCard) {
      // console.log('движение', 'left', event.target.offsetLeft, 'top', event.target.offsetTop)
      // console.log('движение', 'event.clientY', event.clientY, 'event.clientX', event.clientX)
      this.actualCard.style.top = event.clientY - this.coordinateDeviation.y + 'px';
      this.actualCard.style.left = event.clientX - this.coordinateDeviation.x + 'px';
    }
  }
}
