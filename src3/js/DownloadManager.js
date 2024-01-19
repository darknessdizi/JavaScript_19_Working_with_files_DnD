import Data from './Data';

export default class DownloadManager {
  constructor() {
    this.container = null;
    this.books = null;
    this.data = new Data();
    this.sizeFiles = null;
    this.count = 0;

    this.onClick = this.onClick.bind(this);
  }

  init() {
    this.drawUI();
    this.toAppoint();
  }

  toAppoint() {
    this.container.addEventListener('click', this.onClick);
  }

  onClick(evt) {
    if (evt.target.className !== 'link') return;
    const { size } = this.data.getItem(evt.target.closest('tr').querySelector('td').textContent).file;
    this.count += +Data.getMb(size);
    this.sizeFiles.textContent = this.count;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawUI() {
    this.checkBinding();
    this.container.innerHTML = DownloadManager.startMarkUp;
    this.sizeFiles = this.container.querySelector('.quantity');
    this.books = this.container.querySelector('.table__body');
    this.data.memory.forEach((e) => {
      this.books.innerHTML += DownloadManager.bookMarkUp(e.file.name, e.file.size, e.href);
    });
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('container is not bind to DOM');
    }
  }

  static bookMarkUp(name, size, url) {
    return `<tr>
    <td>${Data.getContentName(name)}</td>
    <td>${Data.getMb(size)} Mb</td>
    <td><a href="${url}" rel="noopener" class="link" download="${name}">Download</a></td>
  </tr>`;
  }

  static get startMarkUp() {
    return `<div class="root__body">
    <div class="root__content">
      <table class="root__table table">
        <thead class="table__head">
          <tr>
            <th scope="row" colspan="3">Available Files (without sms and registration):</th>
          </tr>
        </thead>
        <tbody class="table__body">
        </tbody>
      </table>
      <div class="root__quantity">You've already downloaded: <span class="quantity">0</span> Mb</div>
    </div>
  </div>`;
  }
}
