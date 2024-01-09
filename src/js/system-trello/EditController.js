import { createButton } from '../welcomePage';

export default class EditController {
  constructor(editor) {
    this.edit = editor;
    this.column = null;
  }

  init() {
    this.edit.bindToDOM();
    createButton(this.edit.conteiner);

    this.edit.addButtonAddListeners(this.onClickButtonAdd.bind(this));
  }

  onClickButtonAdd(event) {
    const listConteiner = document.querySelectorAll('.conteiner-button');
    listConteiner.forEach((el) => el.classList.remove('noactive'));

    const parent = event.target.closest('.conteiner-button');
    parent.classList.add('noactive');
    this.colum = parent.closest('.column');
    if (this.edit.form) {
      this.edit.form.remove();
      this.edit.drawFormNewCard(this.colum);
    } else {
      this.edit.drawFormNewCard(this.colum);
      this.edit.addButtonAddNewCardListeners(this.onClickButtonAddNewCard.bind(this));
    }
  }

  onClickButtonAddNewCard(event) {
    console.log('g', event)
    // event.preventDefault();
    const value = this.edit.form.querySelector('new-card-textarea')
    this.edit.drawNewCard(this.colum, value);
  }
}
