import { createButton } from '../welcomePage';

export default class EditController {
  constructor(editor) {
    this.edit = editor;
    this.column = null;
  }

  init() {
    // Инициализация проекта
    this.edit.bindToDOM();
    createButton(this.edit.conteiner);

    this.edit.addButtonAddListeners(this.onClickButtonAdd.bind(this));
    this.edit.addButtonAddNewCardListeners(this.onClickButtonAddNewCard.bind(this));
    this.edit.addCrossListeners(this.onClickCross.bind(this));
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
    this.edit.drawNewCard(this.currentColum, value);
  }

  onClickCross() {
    // Callback - отмена ввода данных в форме заполнения новой задачи
    this.edit.form.remove();
    const divBtn = this.currentColum.querySelector('.conteiner-button');
    divBtn.classList.remove('noactive');
  }
}
