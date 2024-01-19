export default class WebInterfaceEdit {
  constructor(parent) {
    this.parent = parent;
    this.result = null;
    this.clickListeners = [];
  }

  bindToDOM(array) {
    // Добавляет поле main к элементу body
    const main = WebInterfaceEdit.addTagHTML(this.parent, 'content-task', 'main');
    const conteiner = WebInterfaceEdit.addTagHTML(main, 'conteiner-manager');
    const divFiles = WebInterfaceEdit.addTagHTML(conteiner, 'content-files');

    const table = WebInterfaceEdit.createTable(divFiles, array);
    table.addEventListener('click', (event) => this.onClickDownload(event));

    const divDownLoad = WebInterfaceEdit.addTagHTML(conteiner, 'content-download');
    divDownLoad.textContent = "You've already downloaded: ";
    this.result = WebInterfaceEdit.addTagHTML(divDownLoad, 'content-download-size', 'span');
    this.result.textContent = '0';
    this.result.after(' Mb');
  }

  static addTagHTML(parent, className = null, type = 'div') {
    // Создает заданный тег и добавляет его в parent
    const div = document.createElement(type);
    div.classList.add(className);
    parent.append(div);
    return div;
  }

  static createTable(parent, array) {
    // Создание таблицы с файлами для скачивания
    const table = WebInterfaceEdit.addTagHTML(parent, 'files-table', 'table');

    const head = WebInterfaceEdit.addTagHTML(table, 'table-head', 'thead');
    let row = WebInterfaceEdit.addTagHTML(head, 'head-row', 'tr');
    const heading = WebInterfaceEdit.addTagHTML(row, 'row-heading', 'th');
    heading.setAttribute('colspan', '3');
    heading.textContent = 'Available Files (without sms and registration):';

    const body = WebInterfaceEdit.addTagHTML(table, 'table-body', 'tbody');
    for (const obj of array) {
      row = WebInterfaceEdit.addTagHTML(body, 'body-row', 'tr');
      const title = WebInterfaceEdit.addTagHTML(row, 'row-data', 'td');
      title.textContent = obj.name;

      const size = WebInterfaceEdit.addTagHTML(row, 'row-data', 'td');
      size.textContent = obj.size;

      const tdLink = WebInterfaceEdit.addTagHTML(row, 'row-data', 'td');
      const link = WebInterfaceEdit.addTagHTML(tdLink, 'row-data-link', 'a');
      link.setAttribute('download', obj.name); // Имя скачанного файла
      link.setAttribute('href', obj.href);
      link.setAttribute('rel', 'noopener'); // Обеспечивает скачивание файла, а не его открытие
      link.textContent = 'Download';
    }
    return table;
  }

  onClickDownload(event) {
    if (event.target.classList.value === 'row-data-link') {
      this.clickListeners.forEach((o) => o.call(null, event));
    }
  }

  addClickDownload(callback) {
    this.clickListeners.push(callback);
  }
}
