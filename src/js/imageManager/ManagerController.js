export default class ManagerController {
  constructor(edit) {
    this.edit = edit;
  }

  init() {
    this.edit.bindToDOM();
    this.edit.addClickConteinerListeners(ManagerController.onClickConteiner.bind(this));
    this.edit.addChangeInputListeners(this.onChangeInput.bind(this));

    this.edit.conteiner.addEventListener('dragover', (e) => {
      // Событие при переносе файлов из окна windows в браузер
      // Необходимо его сбросить
      e.preventDefault();
    });

    this.edit.conteiner.addEventListener('drop', (e) => {
      // Событие при переносе файлов из окна windows в браузер
      // Необходимо его сбросить
      e.preventDefault();
      const { files } = e.dataTransfer;
      if (!files) return;
      this._fileProcessing(files);
    });
  }

  static onClickConteiner(event) {
    // Callback - нажали мышкой в поле контейнера input files
    const { target } = event;
    const parent = target.closest('.conteiner__frame');
    const input = parent.querySelector('.frame_input');
    // Назначаем полю input событие мыши click
    input.dispatchEvent(new MouseEvent('click'));
  }

  onChangeInput(event) {
    // В поле input выбрали фото и нажали открыть
    const { files } = event.target;
    if (!files) return;
    this._fileProcessing(files);
    const cell = event.target;
    cell.value = ''; // Чтобы повторно открывать один и тот же файл
  }

  _fileProcessing(files) {
    // Создает URL для списка файлов и отрисовывает их
    for (const item of files) {
      const { name } = item;
      const url = URL.createObjectURL(item); // Создаем URL из объекта (хранится в памяти)
      this.edit.createDivImage(name, url);
      setTimeout(() => URL.revokeObjectURL(url), 0); // Очищаем память от URL.createObjectURL(item)
      // Можно получить файлы так же через new FileReader()
    }
  }
}
