export default class WebInterfaceController {
  constructor(edit) {
    this.edit = edit;
  }

  init() {
    this.edit.bindToDOM();
  }

}
