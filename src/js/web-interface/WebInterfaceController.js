import book1 from '../../files/Storage Standard.pdf';
import book2 from '../../files/Streams Standard.pdf';
import book3 from '../../files/XMLHttpRequest Standard.pdf';

export default class WebInterfaceController {
  constructor(edit) {
    this.edit = edit;
    this.onClickDownload = this.onClickDownload.bind(this);
    this.memory = [
      { name: 'Storage Standard', size: '304 Kb', href: book1 },
      { name: 'Streams Standard', size: '1.62 Mb', href: book2 },
      { name: 'XMLHttpRequest Standard', size: '814 Kb', href: book3 },
    ];
  }

  init() {
    // Инициализация проекта
    this.edit.bindToDOM(this.memory);
    this.edit.addClickDownload(this.onClickDownload);
  }

  onClickDownload(event) {
    // Callback - нажатие на ссылку скачивания
    const { target } = event;
    let file = new File([target.href], '');
    const reader = new FileReader();
    reader.addEventListener('load', this.loadFile.bind(this));
    reader.readAsDataURL(file);
  }

  loadFile(event) {
    // Обработка события скачивания файла с помощью FileReader
    let count = Number(this.edit.result.textContent);
    let size = event.total / 1024 / 1024;
    count += size;
    this.edit.result.textContent = count.toFixed(2);
  }
}
