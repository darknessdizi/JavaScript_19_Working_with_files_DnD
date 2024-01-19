export default class WebInterfaceEdit {
  constructor(parent) {
    this.parent = parent;
  }

  bindToDOM(array) {
    // Добавляет поле main к элементу body
    const main = WebInterfaceEdit.addTagHTML(this.parent, 'content-task', 'main');
    const conteiner = WebInterfaceEdit.addTagHTML(main, 'conteiner-manager');
    const divFiles = WebInterfaceEdit.addTagHTML(conteiner, 'content-files');

    this.createTable(divFiles, array);
    // const title = WebInterfaceEdit.addTagHTML(divFiles, 'content-files-title', 'span');
    // title.textContent = 'Available Files (without sms and registration):';

    const divDownLoad = WebInterfaceEdit.addTagHTML(conteiner, 'content-download');
    divDownLoad.textContent = "You've already downloaded: ";
    const span = WebInterfaceEdit.addTagHTML(divDownLoad, 'content-download-size', 'span');
    span.textContent = 'XX Mb'
  }

  static addTagHTML(parent, className = null, type = 'div') {
    // Создает заданный тег и добавляет его в parent
    const div = document.createElement(type);
    div.classList.add(className);
    parent.append(div);
    return div;
  }

  createTable(parent, array) {
    const table = WebInterfaceEdit.addTagHTML(parent, 'files-table', 'table');
    const head = WebInterfaceEdit.addTagHTML(table, 'table-head', 'thead');
    let row = WebInterfaceEdit.addTagHTML(head, 'head-row', 'tr');
    const heading = WebInterfaceEdit.addTagHTML(row, 'row-heading', 'th');
    heading.setAttribute('colspan', '2');
    heading.textContent = 'Available Files (without sms and registration):';

    const body = WebInterfaceEdit.addTagHTML(table, 'table-body', 'tbody');
    for (const obj of array) {
      row = WebInterfaceEdit.addTagHTML(body, 'body-row', 'tr');
      const title = WebInterfaceEdit.addTagHTML(row, 'row-data', 'td');
      title.textContent = obj.file.name;
      const size = WebInterfaceEdit.addTagHTML(row, 'row-data', 'td');

      const data = WebInterfaceEdit.compareSize(obj.file.size);
      size.textContent = data;
      const link = WebInterfaceEdit.addTagHTML(row, 'row-data', 'td');
      link.textContent = 'Download';
    }
  }

  static compareSize(size) {
    let result = null;
    let data = size / 1024;
    if (data > 1024) {
      data = data / 1024;
      data = data.toFixed(2);
      result = `${data} Mb`;
    } else {
      data = data.toFixed(2);
      result = `${data} Kb`;
    }
    return result;
  }
}
