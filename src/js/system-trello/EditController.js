import { createButton } from '../welcomePage';

export default class EditController {
  constructor(editor) {
    this.edit = editor;
  }

  init() {
    this.edit.bindToDOM();
    createButton(this.edit.conteiner);

    this.edit.addButtonAddListeners(this.onClickButtonAdd.bind(this));
  }

  onClickButtonAdd(event) {
    console.log('add button', event.target)
    console.dir(event)
    const parent = event.target.closest('.conteiner-button');
    parent.classList.add('noactive');
    const column = parent.closest('.column');
    this.edit.drawInputField(column);
  }
}