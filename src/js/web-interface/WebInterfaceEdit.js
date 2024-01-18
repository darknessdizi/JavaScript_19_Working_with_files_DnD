export default class WebInterfaceEdit {
  constructor(parent) {
    this.parent = parent;
  }

  bindToDOM() {
    // Добавляет поле main к элементу body
    const main = WebInterfaceEdit.addTagHTML(this.parent, 'content-task', 'main');
    const conteiner = WebInterfaceEdit.addTagHTML(main, 'content-conteiner-files');
    const divFiles = WebInterfaceEdit.addTagHTML(conteiner, 'content-files');
    const title = WebInterfaceEdit.addTagHTML(divFiles, 'content-files-title', 'span');
    title.textContent = 'Available Files (without sms and registration):';
    const divDownLoad = WebInterfaceEdit.addTagHTML(conteiner, 'content-download');
    divDownLoad.textContent = "You've already downloaded: ";
    const span = WebInterfaceEdit.addTagHTML(divDownLoad, 'content-download-size', 'span');
    span.textContent = 'XX Mb'

    const pdf = '<embed src="XMLHttpRequest Standard.pdf" width="600px" height="300px" />'
    divFiles.innerHTML += pdf;
  }

  static addTagHTML(parent, className = null, type = 'div') {
    // Создает заданный тег и добавляет его в parent
    const div = document.createElement(type);
    div.classList.add(className);
    parent.append(div);
    return div;
  }
}
