import { createButton } from '../welcomePage';

export default class EditController {
  constructor(editor) {
    this.edit = editor;
    this.currentColum = null;
    this.currentCard = null;
    this.state = {
      'tasks': { title: 'Задачи', data: [1,2,3,4] },
      'process': { title: 'В процессе', data: [1,2,3,4] },
      'completed': { title: 'Выполнены', data: [1,2,3,4] },
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
    if (this.currentCard) return;
    if (event.target.classList.value === 'card') {
      this.currentCard = event.target;
      this.edit.addElementCross(event.target);
    }
  }

  onMouseOutColumn(event) {
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
}
